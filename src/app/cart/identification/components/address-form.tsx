"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateShippingAddress } from "@/hooks/mutations/use-create-shipping-address";

const formSchema = z.object({
  email: z.email("E-mail inválido"),
  fullName: z.string().trim().min(1, "Nome completo é obrigatório"),
  cpfOrCnpj: z
    .string()
    .min(14, "CPF é obrigatório")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  phone: z
    .string()
    .min(15, "Celular é obrigatório")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Celular inválido"),
  zipCode: z
    .string()
    .min(9, "CEP é obrigatório")
    .regex(/^\d{5}-\d{3}$/, "CEP inválido"),
  address: z.string().trim().min(1, "Endereço é obrigatório"),
  number: z.string().trim().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().trim().min(1, "Bairro é obrigatório"),
  city: z.string().trim().min(1, "Cidade é obrigatória"),
  state: z.string().trim().min(1, "Estado é obrigatório"),
});

type FormValues = z.infer<typeof formSchema>;

export const AddressForm = () => {
  const createShippingAddressMutation = useCreateShippingAddress();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cpfOrCnpj: "",
      phone: "",
      zipCode: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Mapear os dados do formulário para o formato esperado pela Server Action
      const addressData = {
        recipientName: data.fullName,
        city: data.city,
        state: data.state,
        street: data.address,
        number: data.number,
        complement: data.complement,
        zipCode: data.zipCode.replace("-", ""), // Remover formatação do CEP
        country: "Brasil", // Valor padrão
        cpfOrCnpj: data.cpfOrCnpj.replace(/\D/g, ""), // Remover formatação do CPF
        neighborhood: data.neighborhood,
        email: data.email,
        phone: data.phone.replace(/\D/g, ""), // Remover formatação do telefone
      };

      await createShippingAddressMutation.mutateAsync(addressData);
      toast.success("Endereço salvo com sucesso!");
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      toast.error("Erro ao salvar endereço. Tente novamente.");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Adicionar novo endereço</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cpfOrCnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF/CNPJ</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="###.###.###-##"
                    mask="_"
                    placeholder="000.000.000-00"
                    customInput={Input}
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.formattedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="(##) #####-####"
                    mask="_"
                    placeholder="(00) 00000-0000"
                    customInput={Input}
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.formattedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="#####-###"
                    mask="_"
                    placeholder="00000-000"
                    customInput={Input}
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.formattedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Rua, avenida, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Apto, casa, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do bairro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="SP, RJ, MG..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={createShippingAddressMutation.isPending}
            >
              {createShippingAddressMutation.isPending
                ? "Salvando..."
                : "Salvar endereço"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
