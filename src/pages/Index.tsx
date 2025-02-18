
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  ArrowRight, 
  FileText, 
  Brain, 
  Shield, 
  Users, 
  Clock, 
  CheckCircle 
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-16 px-4">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-gradient animate-fade-in">
            MediBrief
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up">
            Transform complex medical reports into clear, easy-to-understand summaries using advanced AI technology.
          </p>
          <Button
            onClick={() => navigate("/upload")}
            size="lg"
            className="group mt-8 bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Start Analyzing
            <ArrowRight className={`ml-2 transition-transform duration-300 ${
              isHovered ? "translate-x-1" : ""
            }`} />
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: <FileText className="w-10 h-10 text-primary" />,
              title: "Upload Reports",
              description:
                "Easily upload your medical reports in various image formats",
            },
            {
              icon: <Brain className="w-10 h-10 text-primary" />,
              title: "AI Analysis",
              description:
                "Advanced AI technology breaks down complex medical terminology",
            },
            {
              icon: <Stethoscope className="w-10 h-10 text-primary" />,
              title: "Clear Results",
              description:
                "Get simplified explanations that anyone can understand",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-morphism p-6 rounded-xl hover:bg-white/10 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            Why Choose MediBrief?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-primary" />,
                title: "Privacy First",
                description: "Your medical data is processed securely and never stored.",
              },
              {
                icon: <Clock className="w-8 h-8 text-primary" />,
                title: "Instant Results",
                description: "Get your simplified report analysis in seconds.",
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Patient-Friendly",
                description: "Medical terms explained in plain, understandable language.",
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-primary" />,
                title: "High Accuracy",
                description: "Powered by advanced AI for reliable interpretations.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="glass-morphism p-6 rounded-lg flex items-start space-x-4 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {benefit.icon}
                <div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center glass-morphism p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4 text-gradient">
            Ready to Understand Your Medical Reports?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start using our AI-powered medical report analyzer today and get clear, 
            easy-to-understand explanations of your medical documents.
          </p>
          <Button
            onClick={() => navigate("/upload")}
            size="lg"
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
