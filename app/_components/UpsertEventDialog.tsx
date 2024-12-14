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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./_ui/select";
import { EVENT_TYPES } from "../_constants/events";
import { Textarea } from "./_ui/textarea";
import TimeInput from "./_ui/time-input";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

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
    message: "A ocorrência é obrigatória.",
  }),
  startTime: z.date({
    required_error: "A hora de início é obrigatória.",
  }),
  vtr: z.string({
    required_error: "A VTR é obrigatório.",
  }),
  activationTime: z.date().optional(),
  endTime: z.date().optional(),
  arrivalTime: z.date().optional(),
  note: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const validateTimes = (data: FormSchema) => {
  if (
    data.startTime &&
    data.activationTime &&
    data.arrivalTime &&
    data.endTime
  ) {
    if (data.startTime.getTime() >= data.activationTime.getTime()) {
      toast.error(
        "A hora de acionamento deve ser maior ou igual à hora de início."
      );
      return false;
    }
    if (data.activationTime.getTime() >= data.arrivalTime.getTime()) {
      toast.error(
        "A hora de chegada deve ser maior ou igual à hora de acionamento."
      );
      return false;
    }
    if (data.arrivalTime.getTime() >= data.endTime.getTime()) {
      toast.error("A hora final deve ser maior ou igual à hora de chegada.");
      return false;
    }
  }
  return true;
};

const UpsertEventDialog = ({
  isOpen,
  defaultValues,
  eventId,
  setIsOpen,
}: UpsertEventDialogProps) => {
  const { data: session } = useSession();

  if (!session) {
    toast.error("Usuário não autenticado.");
  }

  const userId = session?.user?.id;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      address: "",
      occasion: "",
      startTime: undefined,
      vtr: "",
      activationTime: undefined,
      endTime: undefined,
      arrivalTime: undefined,
      note: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    if (!userId) {
      toast.error("Usuário não autenticado.");
      return;
    }

    const timeValidationResult = validateTimes(data);
    if (!timeValidationResult) return;

    try {
      await upsertEvent({
        ...data,
        id: eventId,
      });
      toast.success(
        isUpdate
          ? "Evento atualizado com sucesso!"
          : "Evento criado com sucesso!"
      );
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      toast.error("Erro ao salvar a ocorrência. Tente novamente.");
    }
  };

  const isUpdate = Boolean(eventId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="flex flex-col jsutify-center rounded-lg max-w-[80%] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{isUpdate ? "Atualizar" : "Criar"} ocorrência</DialogTitle>
          <DialogDescription className="font-semibold">Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Local</FormLabel>
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
                  <FormLabel className="text-sm">Ocorrência</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma ocorrência" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(EVENT_TYPES).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vtr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">VTR</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite o número da viatura..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-10">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">HI</FormLabel>
                    <TimeInput
                      value={field.value}
                      onChange={(date) => field.onChange(date || undefined)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activationTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">HA</FormLabel>
                    <TimeInput
                      value={field.value}
                      onChange={(date) => field.onChange(date || undefined)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-10">
              <FormField
                control={form.control}
                name="arrivalTime"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2">
                    <FormLabel className="text-sm">HC</FormLabel>
                    <TimeInput
                      value={field.value}
                      onChange={(date) => field.onChange(date || undefined)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2">
                    <FormLabel className="text-sm">HF</FormLabel>
                    <TimeInput
                      value={field.value}
                      onChange={(date) => field.onChange(date || undefined)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Observação</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite uma observação..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end">
              <DialogClose asChild>
                <Button type="button" variant="destructive_outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="w-[40%]">
                {isUpdate ? "Atualizar" : "Adicionar"} ocorrência
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertEventDialog;
