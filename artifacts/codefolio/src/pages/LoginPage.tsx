import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useLogin();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loginMutation.mutate(
      { data: values },
      {
        onSuccess: (data) => {
          login(data);
          toast({ title: "Welcome back!" });
          setLocation("/dashboard");
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: error.message || "Invalid credentials",
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 z-20 text-white/70 hover:text-white transition-colors">
        <Code2 className="w-5 h-5 text-purple-500" />
        <span className="font-bold tracking-tight">CodeFolio</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] relative z-10"
      >
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome back</h1>
            <p className="text-gray-400">Log in to your cockpit.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 font-medium text-xs uppercase tracking-wider">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="you@example.com" 
                        className="bg-black/50 border-white/10 text-white h-12 px-4 rounded-xl focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all placeholder:text-gray-600" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 font-medium text-xs uppercase tracking-wider">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="bg-black/50 border-white/10 text-white h-12 px-4 rounded-xl focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all placeholder:text-gray-600" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-gray-200 h-12 rounded-xl font-semibold text-base mt-4 transition-all hover:scale-[1.02]" 
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Authenticating..." : "Log In"}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-white hover:text-purple-400 transition-colors font-medium">
              Create one
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
