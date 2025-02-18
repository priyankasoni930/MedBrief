import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/components/FileUpload";
import ResultDisplay from "@/components/ResultDisplay";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Volume2, StopCircle } from "lucide-react";
import { toast } from "sonner";

const GEMINI_API_KEY = "AIzaSyDcgTXU32BIG3O6_7SoQ6Poq7y-K2Z-4nY";
const ELEVEN_LABS_API_KEY = ""; // User needs to provide their API key

const Upload = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setSummary("");
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const playAudio = () => {
    if (!summary || isPlaying) return;

    try {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error playing audio:", error);
      toast.error("Failed to play audio. Please try again.");
      setIsPlaying(false);
    }
  };

  const processImage = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setIsProcessing(true);
    try {
      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(selectedFile);
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Please analyze this medical report and provide a comprehensive yet easy-to-understand summary. Follow these guidelines:

1. Start with the most important findings or diagnoses
2. Break down medical terminology into simple language
3. Organize information into clear sections: Diagnosis, Key Findings, and Recommendations
4. Highlight any critical values or concerns that require immediate attention
5. Include any recommended follow-up actions or lifestyle changes
6. Use bullet points for better readability when appropriate
7. Do not use any asterisks or * symbols in the response

DO NOT USE ANY SYMBOL IN RESPONSE NEVER USE ANY * IN RESPONE ONLY GIVE TEXT IN RESPONSE
Please ensure the summary is clear, concise, and actionable for someone without medical background.`,
                  },
                  {
                    inline_data: {
                      mime_type: selectedFile.type,
                      data: base64Image.split(",")[1],
                    },
                  },
                ],
              },
            ],
            safety_settings: {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            generation_config: {
              temperature: 0.4,
              topP: 0.8,
              topK: 40,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const data = await response.json();
      const summary = data.candidates[0].content.parts[0].text;
      setSummary(summary);
      toast.success("Report analyzed successfully!");
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process the report. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 hover:bg-transparent hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-medium tracking-tight text-gradient">
            Upload Your Report
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your medical report and get a simplified explanation that's
            easy to understand. We'll break down the medical terminology and
            highlight the important information.
          </p>
        </div>

        <div className="glass-morphism p-8 rounded-xl">
          <FileUpload
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
          />

          {selectedFile && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={processImage}
                disabled={isProcessing}
                className="relative bg-primary text-primary-foreground hover:opacity-90"
              >
                {isProcessing && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {isProcessing ? "Analyzing Report..." : "Analyze Report"}
              </Button>
            </div>
          )}
        </div>

        {summary && (
          <div className="space-y-4">
            <ResultDisplay summary={summary} />
            <div className="flex justify-center gap-4">
              <Button
                onClick={playAudio}
                disabled={isPlaying}
                className="mt-4 bg-primary text-primary-foreground hover:opacity-90"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                {isPlaying ? "Playing..." : "Listen to Summary"}
              </Button>
              {isPlaying && (
                <Button
                  onClick={stopAudio}
                  className="mt-4 bg-destructive text-destructive-foreground hover:opacity-90"
                >
                  <StopCircle className="w-4 h-4 mr-2" />
                  Stop Audio
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
