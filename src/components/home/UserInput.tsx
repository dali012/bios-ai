"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import MetaIcon from "../icons/MetaIcon";
import HuggingFaceIcon from "../icons/HuggingFaceIcon";
import GoogleIcon from "../icons/GoogleIcon";
import OpenAiIcon from "../icons/OpenAiIcon";
import { Slider } from "../ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { generateBio } from "@/app/actions";
import { useContext } from "react";
import { BioContext } from "@/context/BioContext";

const formSchema = z.object({
  model: z.string().nonempty("Model is required"),
  temperature: z
    .number()
    .min(0, "temperature must be at least 0")
    .max(2, "temperature must be at most 1"),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters")
    .max(500, "Content must be at most 500 characters"),
  type: z.enum(["personal", "brand"], {
    errorMap: () => ({ message: "Type is required" }),
  }),
  tone: z.enum(
    ["professional", "casual", "humorous", "passionate", "thoughtful"],
    {
      errorMap: () => ({ message: "Tone is required" }),
    }
  ),
  emojis: z.boolean(),
});

const UserInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "llama3-8b-8192",
      temperature: 1,
      content: "",
      type: "personal",
      tone: "professional",
      emojis: false,
    },
  });

  const { loading, setLoading, setOutput } = useContext(BioContext);

  async function onSumbit(values: z.infer<typeof formSchema>) {
    const userInputValues = `
      User Input: ${values.content},
      Bio Type: ${values.type},
      Bio Tone: ${values.tone},
      Add Emojis: ${values.emojis}
    `;
    setLoading(true);

    try {
      const { data } = await generateBio(
        userInputValues,
        values.temperature,
        values.model
      );
      setOutput(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col items-start gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSumbit)}
          className="grid w-full items-start gap-6"
        >
          <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm">
            <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="llama3-8b-8192">
                            <div className="flex items-start text-muted-foreground gap-3">
                              <MetaIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium mr-2">
                                    Llama 3
                                  </span>
                                  8B
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="deepseek-r1-distill-llama-70b">
                            <div className="flex items-start text-muted-foreground gap-3">
                              <HuggingFaceIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium mr-2">
                                    Deepseek R1
                                  </span>
                                  70B
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="gemma2-9b-it">
                            <div className="flex items-start text-muted-foreground gap-3">
                              <GoogleIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium mr-2">
                                    Google
                                  </span>
                                  9B
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="whisper-large-v3	">
                            <div className="flex items-start text-muted-foreground gap-3">
                              <OpenAiIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium mr-2">
                                    OpenAi
                                  </span>
                                  V3
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* slider for temperature */}
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      <span className="flex items-center justify-center">
                        Creativity
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 ml-1 cursor-pointer" />
                            <TooltipContent
                              sideOffset={25}
                              collisionPadding={20}
                              className="max-w-sm"
                            >
                              <p>
                                A higher temperature will result in more
                                creative.
                              </p>
                            </TooltipContent>
                          </TooltipTrigger>
                        </Tooltip>
                      </span>
                      <span>{value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[1]}
                        min={0}
                        max={2}
                        step={0.1}
                        onValueChange={(value) => onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          {/* user input form */}
          <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-sm ">
            <legend className="-ml-1 px-1 text-sm font-medium">
              User Input
            </legend>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      About yourself
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[10rem]"
                        placeholder="Add your old twitter bio or write few senteances about yourself"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="brand">Brand</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Tone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="passionate">Passionate</SelectItem>
                        <SelectItem value="thoughtful">Thoughtful</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="emojis"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="text-sm mr-4">Add Emojis</FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="!my-0"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <Button className="rounded" type="submit" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Generate
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserInput;
