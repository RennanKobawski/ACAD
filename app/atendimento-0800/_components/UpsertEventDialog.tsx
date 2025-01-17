import { Button } from "@/app/_components/_ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/_ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/_ui/form";
import { Input } from "@/app/_components/_ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertEvent } from "@/app/atendimento-0800/_actions/upsert-events/upsert-event";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/_ui/select";
import { EVENT_TYPES } from "@/app/_constants/events";
import { Textarea } from "@/app/_components/_ui/textarea";
import TimeInput from "@/app/_components/_ui/time-input";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { upsertEventSchema } from "../_actions/upsert-events/schema";

interface UpsertEventDialogProps {
  isOpen: boolean;
  defaultValues?: FormSchema;
  eventId?: number;
  setIsOpen: (isOpen: boolean) => void;
}

type FormSchema = z.infer<typeof upsertEventSchema>;

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
    resolver: zodResolver(upsertEventSchema),
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

  
  const isUpdate = Boolean(eventId);

  const onSubmit = async (data: FormSchema) => {

    if (!userId) {
      toast.error("Usuário não autenticado.");
      return;
    }
  
    const timeValidationResult = validateTimes(data);
    if (!timeValidationResult) return;

    await upsertEvent({
      ...data,
      id: eventId ?? 0,
      note: data.note ?? "",
    });
 
    toast.success(
      isUpdate
        ? "Ocorrência atualizada com sucesso!"
        : "Ocorrência criada com sucesso!"
    );
    setIsOpen(false);
    form.reset();
  };

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
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-xl font-bold">{isUpdate ? "Atualizar" : "Criar"} ocorrência</DialogTitle>
          <DialogDescription className="font-semibold text-[#515151]">Insira as informações abaixo</DialogDescription>
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
                      {Object.entries(EVENT_TYPES).map(([index, value]) => (
                        <SelectItem key={index} value={value}>
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
