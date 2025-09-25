"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState("");
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
      {/* Left: Contact Form */}
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

      {/* Right: Contact Info */}
      <Card className="shadow-md p-6 flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Contact Info</CardTitle>
          <CardDescription>you can still reach me directly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <a
              href="mailto:prevailfrancis@gmaiil.com.com"
              className="hover:underline text-sm text-blue-400"
            >
              prevailfrancis@gmaiil.com
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

          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com/fran-897-uinx"
              target="_blank"
              className="text-gray-700 hover:text-black"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/francis-prevail-39b800359/"
              target="_blank"
              className="text-blue-700 hover:text-blue-900"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
