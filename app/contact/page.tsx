"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Github, Linkedin, Terminal } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import { BsPhoneVibrate, BsTwitterX, BsYoutube } from "react-icons/bs";
import { submitContactForm } from "@/services/contact";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setStatus("Sending...");
    try {
      await submitContactForm(values);
      setStatus("Message sent successfully!");
      form.reset();
    } catch {
      setStatus("Something went wrong, try again.");
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 bg-gray-950 text-green-400">
        <section className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/contact $</span>
            </div>
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className={`${mono.className} text-4xl md:text-5xl font-bold text-green-400 mb-2`}>
              $ mail --send
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className={`${mono.className} text-green-600/70 text-sm`}>
              # get in touch
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-900/40 border-green-500/20 text-green-400 shadow-none rounded-none">
              <CardHeader>
                <CardTitle className={`${mono.className} text-2xl font-bold text-green-400`}>./contact_form</CardTitle>
                <CardDescription className={`${mono.className} text-green-600/70`}>fill in the fields below</CardDescription>
              </CardHeader>
              <CardContent>
                {status && <p className={`${mono.className} mt-4 text-center text-sm text-green-500`}>{status}</p>}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={`${mono.className} text-green-500`}>name</FormLabel>
                          <FormControl>
                            <Input placeholder="your name" {...field}
                              className={`${mono.className} bg-gray-900 border-green-500/30 text-green-400 placeholder-green-700/50 focus:border-green-400 rounded-none`} />
                          </FormControl>
                          <FormMessage className={`${mono.className} text-red-500/80 text-xs`} />
                        </FormItem>
                      )} />
                    <FormField control={form.control} name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={`${mono.className} text-green-500`}>email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field}
                              className={`${mono.className} bg-gray-900 border-green-500/30 text-green-400 placeholder-green-700/50 focus:border-green-400 rounded-none`} />
                          </FormControl>
                          <FormMessage className={`${mono.className} text-red-500/80 text-xs`} />
                        </FormItem>
                      )} />
                    <FormField control={form.control} name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={`${mono.className} text-green-500`}>message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="write your message..." {...field}
                              className={`${mono.className} bg-gray-900 border-green-500/30 text-green-400 placeholder-green-700/50 focus:border-green-400 rounded-none`} />
                          </FormControl>
                          <FormMessage className={`${mono.className} text-red-500/80 text-xs`} />
                        </FormItem>
                      )} />
                    <Button type="submit"
                      className={`${mono.className} w-full bg-green-900/30 border border-green-500/50 text-green-400 hover:bg-green-900/50 cursor-pointer rounded-none`}>
                      $ ./send_mail.sh
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/40 border-green-500/20 text-green-400 shadow-none rounded-none p-4 flex flex-col justify-start">
              <CardHeader className="border-b border-green-500/10 pb-4 mb-0 text-center">
                <CardTitle className={`${mono.className} text-3xl font-bold text-green-400`}>reach_me</CardTitle>
                <CardDescription className={`${mono.className} text-green-600/70 text-sm`}># direct contact channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 grid md:grid-cols-2 sm:grid-cols-1 gap-2 mt-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-500" />
                  <a href="mailto:prevailfrancis@gmail.com" className={`${mono.className} hover:underline text-sm text-green-500/80`}>prevailfrancis@gmail.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <span className={`${mono.className} text-sm text-green-500/80`}>+234 7043-1188 41</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span className={`${mono.className} text-sm text-green-500/60`}>Anambara, Nigeria</span>
                </div>
                <div className="flex gap-3">
                  <a href="https://github.com/DeFrancis-unix27" target="_blank" className="text-green-500/60 hover:text-green-400"><Github className="w-4 h-4" /></a>
                  <a href="https://www.linkedin.com/in/francis-david-7code" target="_blank" className="text-green-500/60 hover:text-green-400"><Linkedin className="w-4 h-4" /></a>
                  <a href="https://x.com/CodeWithFrancis" target="_blank" className="text-green-500/60 hover:text-green-400"><BsTwitterX className="w-4 h-4" /></a>
                  <a href="https://youtube.com/codesmith_dev" target="_blank" className="text-green-500/60 hover:text-green-400"><BsYoutube className="w-4 h-4" /></a>
                </div>
              </CardContent>
              <CardContent className="flex justify-center mt-4">
                <div className="relative w-64 h-36 overflow-hidden flex items-center justify-center group border border-green-500/20">
                  <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                    <p className={`${mono.className} text-lg font-semibold text-green-400`}>book_meeting</p>
                    <Button variant="ghost" aria-label="Book a meeting"
                      className={`${mono.className} mt-3 bg-green-900/30 border border-green-500/50 text-green-400 hover:bg-green-900/50 px-5 py-2 transition-all flex items-center gap-2 cursor-pointer rounded-none`}
                      onClick={() => window.open("https://cal.com/francis-david-kygzgw", "_blank")}>
                      $ ./book.sh <BsPhoneVibrate />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
