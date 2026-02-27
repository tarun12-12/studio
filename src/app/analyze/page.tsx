"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, RefreshCcw, Stethoscope, AlertCircle, Info } from 'lucide-react';
import { aiSymptomAnalysis, type AiSymptomAnalysisOutput } from '@/ai/flows/ai-symptom-analysis';

export default function AnalyzePage() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiSymptomAnalysisOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    try {
      const output = await aiSymptomAnalysis({ symptoms });
      setResult(output);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSymptoms('');
    setResult(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold font-headline">AI Symptom Analyzer</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tell us how you're feeling. Our AI will analyze your symptoms and suggest potential conditions and specialists.
            </p>
          </div>

          {!result ? (
            <Card className="border-none shadow-xl">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Describe your symptoms</CardTitle>
                  <CardDescription>
                    Include details like when it started, severity, and any specific areas affected.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="E.g., I've been having sharp chest pain for the last 2 hours that radiates to my left arm. I also feel slightly nauseous."
                    className="min-h-[200px] text-lg resize-none border-slate-200 focus:ring-primary"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    disabled={loading}
                  />
                  <div className="flex items-start gap-2 p-4 bg-amber-50 rounded-lg text-amber-800 text-sm border border-amber-100">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>
                      <strong>Important:</strong> This is NOT a medical diagnosis. If you are experiencing a life-threatening emergency, please call your local emergency services immediately.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg bg-primary hover:bg-primary/90" 
                    disabled={loading || !symptoms.trim()}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <RefreshCcw className="h-5 w-5 animate-spin" /> Analyzing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-5 w-5" /> Analyze Symptoms
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-primary shadow-lg overflow-hidden">
                <div className="bg-primary/5 p-6 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold font-headline">Analysis Summary</h2>
                  </div>
                  <Button variant="outline" size="sm" onClick={reset} className="border-primary text-primary">
                    <RefreshCcw className="h-4 w-4 mr-2" /> Start New Analysis
                  </Button>
                </div>
                <CardContent className="p-8 space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-slate-900">Potential Conditions</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.potentialConditions.map((condition, idx) => (
                        <Badge key={idx} variant="secondary" className="px-3 py-1.5 text-sm bg-primary/10 text-primary border-none">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-slate-900">Recommended Specialists</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {result.recommendedSpecialists.map((specialist, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-primary transition-colors cursor-pointer">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Stethoscope className="h-5 w-5" />
                          </div>
                          <span className="font-medium">{specialist}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 p-6 flex items-start gap-3">
                  <Info className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-500 italic">
                    This analysis is based on the symptoms provided and is intended for informational purposes only. It does not replace professional medical advice, diagnosis, or treatment.
                  </p>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" size="lg" className="h-16 text-lg rounded-2xl border-2">
                  Find Hospitals Nearby
                </Button>
                <Button size="lg" className="h-16 text-lg rounded-2xl bg-secondary hover:bg-secondary/90">
                  Chat with a Specialist
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}