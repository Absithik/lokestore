import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Mother of Two",
    content: "The quality of the wooden toys is exceptional. My kids have been playing with the train set for months, and it still looks brand new. Truly heirloom quality!",
    rating: 5,
    avatar: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    id: 2,
    name: "David Miller",
    role: "Early Childhood Educator",
    content: "As a teacher, I'm always looking for toys that spark creativity. ToyWonder's educational collection is brilliant. The building blocks are a favorite in my classroom.",
    rating: 5,
    avatar: "https://picsum.photos/seed/david/100/100"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Grandmother",
    content: "I bought the space explorer set for my grandson's birthday. The joy on his face was priceless. Fast delivery and beautiful packaging too!",
    rating: 5,
    avatar: "https://picsum.photos/seed/elena/100/100"
  }
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What materials are your toys made from?",
    answer: "We prioritize natural, sustainable materials. Our wooden collection is made from FSC-certified maple, beech, and rubberwood, finished with non-toxic, water-based paints and organic oils."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days within the continental US. We also offer express 2-day shipping for those last-minute gifts!"
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to over 50 countries worldwide. International shipping times vary by location, usually ranging from 7-14 business days."
  },
  {
    question: "What is your return policy?",
    answer: "We want you to be 100% happy. If you're not satisfied, you can return any unused toy in its original packaging within 30 days for a full refund."
  },
  {
    question: "Are your toys safety tested?",
    answer: "Absolutely. Every toy we sell undergoes rigorous safety testing and meets or exceeds ASTM F963 and EN71 international toy safety standards."
  }
];

const FAQAccordion: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-xl font-bold text-slate-900 group-hover:text-toy-teal transition-colors">
          {item.question}
        </span>
        <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-toy-teal text-white' : 'bg-slate-100 text-slate-400'}`}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed max-w-3xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const TestimonialsAndFAQ: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Testimonials Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-toy-pink/10 text-toy-pink px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest mb-6"
          >
            <Star size={16} className="fill-current" />
            Happy Families
          </motion.div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-slate-900 mb-6">
            What Parents <span className="text-toy-teal">Are Saying</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Real stories from real parents who have brought the magic of ToyWonder into their homes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-32">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 p-10 rounded-[40px] relative group hover:bg-toy-teal transition-colors duration-500"
            >
              <div className="absolute top-10 right-10 text-slate-200 group-hover:text-white/20 transition-colors">
                <Quote size={60} />
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex gap-1 text-toy-yellow group-hover:text-white transition-colors">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-700 text-lg font-medium leading-relaxed group-hover:text-white transition-colors">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4 pt-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full border-2 border-white shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-white transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-500 text-sm group-hover:text-white/70 transition-colors">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-5xl font-black text-slate-900 mb-6 leading-tight">
                Frequently Asked <br />
                <span className="text-toy-pink">Questions</span>
              </h2>
              <p className="text-slate-500 text-lg mb-8">
                Got questions? We've got answers. If you can't find what you're looking for, feel free to reach out to our friendly team.
              </p>
              <button className="bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-toy-teal transition-colors group">
                <MessageCircle size={20} />
                Contact Support
              </button>
            </motion.div>

            <div className="hidden lg:block relative">
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-64 h-64 bg-toy-yellow/20 rounded-[60px] flex items-center justify-center p-8"
              >
                <img 
                  src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=400" 
                  alt="Support Toy" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-toy-teal rounded-full flex items-center justify-center text-white font-black text-center text-xs rotate-12 shadow-xl">
                WE'RE <br /> HERE TO <br /> HELP!
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-8 md:p-12 rounded-[48px]"
          >
            <div className="divide-y divide-slate-200">
              {faqs.map((faq, index) => (
                <FAQAccordion key={index} item={faq} />
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
