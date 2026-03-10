"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
const poppins = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "auto",
});

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
import { BsPhoneVibrate, BsTwitterX, BsYoutube } from "react-icons/bs";

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
      const res = await fetch("https://formspree.io/f/xgvlggkj", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        form.reset();
      } else {
        setStatus("❌ Something went wrong, try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Network error.");
    }
  }

  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-8"
    >
      {/* inset-inline-start: Contact Form */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Get in Touch
          </CardTitle>
          <CardDescription className="text-center">
            Fill the form below or use my contact info.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status && (
            <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer">
                Send Message
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* inset-inline-end: Contact Info */}
      <Card className="shadow-md p-4 flex flex-col justify-start">
        <CardHeader className="border-b transition-transform transform-border hover:scale-105 pb-0 mb-0 text-center">
          <CardTitle
            className={`${poppins.className} text-3xl font-bold italic`}
          >
            Contact Info
          </CardTitle>
          <CardDescription className="capitalize">
            you can still reach me directly. with the following details below Or
            book a meeting with me either voice / video conference
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 grid md:grid-cols-2 sm:grid-cols-1 gap-2 text-end">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-600 font-bold" />
            <a
              href="mailto:prevailfrancis@gmaiil.com"
              className="hover:underline text-sm text-blue-400"
            >
              prevailfrancis@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-500">+234 7043-1188 41</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-red-600" />
            <span className="text-sm text-slate-500">Anambara, Nigeria</span>
          </div>
          <div className="flex gap-3">
            <a
              href="https://github.com/fran-897-uinx"
              target="_blank"
              className="text-gray-700 hover:text-black"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/francis-prevail-39b800359/"
              target="_blank"
              className="text-blue-700 hover:text-blue-900"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/francis-prevail-39b800359/"
              target="_blank"
              className="text-gray-400 hover:text-gray-300"
            >
              <BsTwitterX className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/francis-prevail-39b800359/"
              target="_blank"
              className="text-red-700 hover:text-red-900"
            >
              <BsYoutube className="w-4 h-4" />
            </a>
          </div>
        </CardContent>
        <CardContent className="flex justify-center">
          <div className="relative w-64 h-36 rounded-3xl overflow-hidden flex items-center justify-center group border-4 border-x-white">
            {/* animated gradient border */}
            <div className="absolute inset-0 animate-ping bg-gradient-to-r from-blue-600 via-purple-600 to-gray-700 opacity-60 blur-lg"></div>

            {/* inner card */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
              <p className={`text-lg font-semibold  ${poppins.className}`}>
                Book a meeting now
              </p>

              <Button
                variant="ghost"
                className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow-md transition-transform duration-200 hover:scale-105 flex items-center gap-2 cursor-pointer"
                onClick={() =>
                  window.open("https://cal.com/francis-david-kygzgw", "_blank")
                }
              >
                Click to Book <BsPhoneVibrate />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
