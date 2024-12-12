import { Button } from "./_ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./_ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./_ui/form";
import { Input } from "./_ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertEvent } from "../_actions/upsert-events/upsert-event";
import { z } from "zod";

interface UpsertEventDialogProps {
  isOpen: boolean;
  defaultValues?: FormSchema;
  eventId?: number;
  setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  address: z.string().trim().min(1, {
    message: "O endereço é obrigatório.",
  }),
  occasion: z.string().trim().min(1, {
    message: "A ocasião é obrigatória.",
  }),
  startTime: z.date({
    required_error: "A hora de início é obrigatória.",
  }),
  vtr: z.number().positive(),
  activationTime: z.date({
    required_error: "A hora de ativação é obrigatória.",
  }),
  endTime: z.date({
    required_error: "A hora de fim é obrigatória.",
  }),
  arrivalTime: z.number().positive(),
  note: z.string(),
  userId: z.string().uuid(),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertEventDialog = ({
  isOpen,
  defaultValues,
  eventId,
  setIsOpen,
}: UpsertEventDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      address: "",
      occasion: "",
      startTime: undefined,
      vtr: 0,
      activationTime: undefined,
      endTime: undefined,
      arrivalTime: undefined,
      note: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertEvent({
        ...data,
        id: eventId,
      });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const isUpdate = Boolean(eventId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Atualizar" : "Criar"} evento</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o endereço..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ocorrência</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a ocorrência..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora de Início</FormLabel>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={
                      field.value && field.value instanceof Date
                        ? field.value.toISOString().slice(0, 16)
                        : ""
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activationTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora de Acionamento</FormLabel>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={
                      field.value && field.value instanceof Date
                        ? field.value.toISOString().slice(0, 16)
                        : ""
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora Final</FormLabel>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={
                      field.value && field.value instanceof Date
                        ? field.value.toISOString().slice(0, 16)
                        : ""
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite uma observação..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">
                {isUpdate ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertEventDialog;
