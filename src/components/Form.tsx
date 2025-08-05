"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  clientType: z.string().min(1, {
    message: "Ce champ est requis.",
  }),
  refinancing: z.string().min(1, {
    message: "Ce champ est requis.",
  }),
  creditAgent: z.string().min(1, {
    message: "Ce champ est requis.",
  }),
});

export default function ReferenceForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientType: "",
      refinancing: "",
      creditAgent: "",
    },
  });

  async function onSubmit() {
    try {
      const res = await fetch("/api/transfer-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leadId: 1 }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error:", error);
        return;
      }

      const data = await res.json();
      console.log("Success:", data);
      form.reset();
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  return (
    <div className="w-full bg-white py-6 max-w-md mx-auto">
      <div className="px-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Types de référence client */}
            <FormField
              control={form.control}
              name="clientType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Types de référence client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nouveau">Nouveau client</SelectItem>
                        <SelectItem value="existant">
                          Client existant
                        </SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Refinancement */}
            <FormField
              control={form.control}
              name="refinancing"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Refinancement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oui">Oui</SelectItem>
                        <SelectItem value="non">Non</SelectItem>
                        <SelectItem value="en-cours">
                          {"En cours d'évaluation"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Agent de crédit */}
            <FormField
              control={form.control}
              name="creditAgent"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Agent de crédit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marie-dupont">
                          Marie Dupont
                        </SelectItem>
                        <SelectItem value="jean-martin">Jean Martin</SelectItem>
                        <SelectItem value="sophie-bernard">
                          Sophie Bernard
                        </SelectItem>
                        <SelectItem value="pierre-durand">
                          Pierre Durand
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg mt-6"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Envoi en cours..."
                : "Envoyer une référence"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
