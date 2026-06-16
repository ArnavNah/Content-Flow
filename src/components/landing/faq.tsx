import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI understand my brand's tone?",
    answer: "Our advanced NLP engine analyzes the source content you provide. If you upload a blog post, we extract its unique vocabulary, sentence structure, and framing, then replicate that voice across all generated assets."
  },
  {
    question: "Do I need a paid API key for OpenAI or Anthropic?",
    answer: "No, ContentFlow AI includes all necessary AI processing within your subscription tier. You don't need to bring your own API keys."
  },
  {
    question: "What platforms are supported?",
    answer: "Currently, we support generating native-feeling content for LinkedIn, Twitter (X), Newsletters (Substack/Beehiiv formats), and short-form video scripts (TikTok, Reels, Shorts)."
  },
  {
    question: "Can I manage multiple clients?",
    answer: "Yes, our Agency plan allows you to create separate Workspaces for each client, ensuring their content, tone profiles, and analytics remain completely siloed."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <Accordion className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b-border/50">
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
