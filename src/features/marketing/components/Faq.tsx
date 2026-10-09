import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';

const QUESTIONS = [
  {
    question: 'Which file types can I upload?',
    answer: 'PDF, Word (.docx) and CSV.',
  },
  {
    question: 'How is an exam different from a quiz?',
    answer:
      'Exams are timed: a countdown runs, hints are off, and you get a score at the end. Quizzes are for relaxed practice.',
  },
  {
    question: 'Where do the questions come from?',
    answer:
      'Only from the documents you upload. Each answer links to the passage it is based on, so you can check it.',
  },
  {
    question: 'Is my data private?',
    answer: 'Placeholder answer about privacy and data handling.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Placeholder answer about pricing.',
  },
];

export function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto w-full max-w-content rounded-card border border-border bg-surface px-6 shadow-card"
    >
      {QUESTIONS.map((item) => (
        <AccordionItem key={item.question} value={item.question}>
          <AccordionTrigger className="text-body">{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
