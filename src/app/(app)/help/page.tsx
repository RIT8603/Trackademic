import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  const faqs = [
    {
      question: "How does the automated attendance work?",
      answer: "The system uses classroom cameras to perform face recognition on students who enter the classroom, automatically marking their attendance against the class roster."
    },
    {
      question: "What happens if a student is marked absent incorrectly?",
      answer: "Teachers have the ability to manually override any attendance records directly from their dashboard to correct any errors."
    },
    {
      question: "How is student privacy protected?",
      answer: "All data, including video feeds and attendance records, is handled with end-to-end encryption. We adhere to strict data privacy policies to ensure student information is secure."
    },
    {
      question: "Can I customize the academic planner suggestions?",
      answer: "Yes, the planner suggestions are based on the strengths, interests, and career goals you provide. You can update this information at any time on the Planner page to get new suggestions."
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions and get help with the platform.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Browse through our most common questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Still need help? Send our team a message.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Input placeholder="Your email address" />
            <Input placeholder="Subject" />
            <textarea className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground" placeholder="Describe your issue..."></textarea>
            <Button>Send Message</Button>
        </CardContent>
      </Card>
    </div>
  );
}
