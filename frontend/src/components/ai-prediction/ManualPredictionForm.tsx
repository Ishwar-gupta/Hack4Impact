import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { PredictionService } from "@/services/predictionService";
import type { DatasetField, ManualPredictionFormData } from "@/types/prediction";
import { cn } from "@/utils/utils";
import {
  ChevronDown,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Check,
  ChevronsUpDown,
  TrendingUp,
  Briefcase,
  AlertTriangle,
} from "lucide-react";

interface ManualPredictionFormProps {
  onSubmit: (data: ManualPredictionFormData) => void;
  isLoading?: boolean;
  error?: string;
}

const SECTION_ORDER = [
  "Personal Information",
  "Education",
  "Employment",
  "Migration History",
  "Economic Indicators",
  "Financial Information",
  "Sector Statistics",
  "Government Indicators",
  "Persona",
];

export function ManualPredictionForm({
  onSubmit,
  isLoading = false,
  error,
}: ManualPredictionFormProps) {
  // Initialize with the first section expanded by default
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Personal Information": true,
  });
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [openCombobox, setOpenCombobox] = useState<Record<string, boolean>>({});
  
  const formRef = useRef<HTMLFormElement>(null);

  const fields = PredictionService.getDatasetFields();

  // Group fields by section
  const sectionedFields = fields.reduce(
    (acc, field) => {
      const section = field.section || "Other";
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(field);
      return acc;
    },
    {} as Record<string, DatasetField[]>,
  );

  // Sort sections based on SECTION_ORDER
  const sortedSections = Object.entries(sectionedFields).sort(([a], [b]) => {
    const aIndex = SECTION_ORDER.indexOf(a);
    const bIndex = SECTION_ORDER.indexOf(b);
    const aOrder = aIndex === -1 ? 999 : aIndex;
    const bOrder = bIndex === -1 ? 999 : bIndex;
    return aOrder - bOrder;
  });

  const { register, handleSubmit, watch, formState, control, setValue, reset } =
    useForm<ManualPredictionFormData>({
      mode: "onChange",
      defaultValues: {},
    });

  const formValues = watch();
  const errors = formState.errors;

  const requiredFields = fields.filter((f) => f.required);
  const optionalFields = fields.filter((f) => !f.required);

  const filledRequiredFields = requiredFields.filter((f) => {
    const value = formValues[f.name];
    return value !== undefined && value !== "" && value !== null && !Number.isNaN(value);
  });

  const filledOptionalFields = optionalFields.filter((f) => {
    const value = formValues[f.name];
    return value !== undefined && value !== "" && value !== null && !Number.isNaN(value) && value !== false;
  });

  // Calculate form completion percentage based on required fields
  useEffect(() => {
    if (requiredFields.length === 0) {
      setCompletionPercentage(100);
      return;
    }

    const filledRequired = requiredFields.filter((f) => {
      const value = formValues[f.name];
      return value !== undefined && value !== "" && value !== null && !Number.isNaN(value);
    });

    const percentage = Math.round(
      (filledRequired.length / requiredFields.length) * 100,
    );
    setCompletionPercentage(percentage);
  }, [formValues, requiredFields]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Helper validation scrolling and auto-expanding
  const handleFormError = (formErrors: typeof errors) => {
    const errorFieldNames = Object.keys(formErrors);
    if (errorFieldNames.length > 0) {
      const firstErrorFieldName = errorFieldNames[0];
      const errorFieldObj = fields.find((f) => f.name === firstErrorFieldName);

      if (errorFieldObj && errorFieldObj.section) {
        // Auto expand the section containing the error
        setExpandedSections((prev) => ({
          ...prev,
          [errorFieldObj.section!]: true,
        }));

        // Scroll to the input element after letting the animation finish
        setTimeout(() => {
          const element = document.getElementsByName(firstErrorFieldName)[0];
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.focus({ preventScroll: true });
          } else {
            // Try scrolling by ID fallback
            const fallbackElement = document.getElementById(firstErrorFieldName);
            fallbackElement?.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 250);
      }
    }
  };

  // Check if a section's required fields are complete
  const getSectionStatus = (sectionFields: DatasetField[]) => {
    const reqFields = sectionFields.filter((f) => f.required);
    if (reqFields.length === 0) return "neutral";

    const filledReq = reqFields.filter((f) => {
      const val = formValues[f.name];
      return val !== undefined && val !== "" && val !== null && !Number.isNaN(val);
    });

    if (filledReq.length === reqFields.length) {
      return "complete";
    }
    if (filledReq.length > 0) {
      return "partial";
    }
    return "incomplete";
  };

  const renderSectionHeaderStatus = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" />;
      case "partial":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "incomplete":
        return <AlertCircle className="w-5 h-5 text-muted-foreground/40" />;
      default:
        return <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30 mr-1.5 ml-1.5" />;
    }
  };

  // Type helpers
  const isScore = (field: DatasetField) => {
    return (
      field.type === "number" &&
      (field.max === 10 ||
        field.max === 5 ||
        field.name.includes("satisfaction") ||
        field.name.includes("perception") ||
        field.name.includes("quality") ||
        field.name.includes("tolerance") ||
        field.name.includes("support"))
    );
  };

  const isCurrency = (field: DatasetField) => {
    return (
      field.type === "number" &&
      (field.name.includes("income") ||
        field.name.includes("tax") ||
        field.name.includes("investment") ||
        field.name.includes("amount") ||
        field.name.includes("remittance"))
    );
  };

  const isPercentage = (field: DatasetField) => {
    return (
      field.type === "number" &&
      (field.name.includes("pct") ||
        field.name.includes("rate") ||
        field.name.includes("dependency") ||
        field.name.includes("pressure"))
    );
  };

  const renderField = (field: DatasetField) => {
    const value = formValues[field.name];
    const fieldError = errors[field.name];
    const isUSD = field.name.includes("usd") || field.name.includes("USD");

    // 1. SYNCHRONIZED SCORES -> Slider + Input
    if (isScore(field)) {
      const ratingMin = field.min ?? 1;
      const ratingMax = field.max ?? 10;
      const currentVal = value !== undefined && value !== null ? Number(value) : ratingMin;
      const step = field.name === "ielts_score" ? 0.5 : 1;

      return (
        <div key={field.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-1.5 text-foreground">
              {field.description || field.name}
              {field.required && <span className="text-destructive font-bold">*</span>}
            </Label>
            {field.description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs bg-popover border border-border text-popover-foreground">
                  <p>{field.description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="flex items-center gap-4 bg-secondary/10 p-3 rounded-lg border border-border/10">
            <div className="flex-1">
              <Controller
                name={field.name}
                control={control}
                defaultValue={ratingMin}
                render={({ field: { value: sliderValue, onChange } }) => (
                  <Slider
                    value={[typeof sliderValue === "number" ? sliderValue : ratingMin]}
                    onValueChange={(v) => onChange(v[0])}
                    min={ratingMin}
                    max={ratingMax}
                    step={step}
                    className="py-2"
                  />
                )}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground px-0.5 mt-1">
                <span>{ratingMin}</span>
                <span>{ratingMax}</span>
              </div>
            </div>
            <Input
              type="number"
              min={ratingMin}
              max={ratingMax}
              step={step}
              value={currentVal}
              onChange={(e) => {
                let val = parseFloat(e.target.value);
                if (isNaN(val)) val = ratingMin;
                else if (val < ratingMin) val = ratingMin;
                else if (val > ratingMax) val = ratingMax;
                setValue(field.name, val, { shouldValidate: true });
              }}
              className="w-20 text-center font-bold h-9 bg-background border border-input focus-visible:ring-1"
            />
          </div>
          {fieldError && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {String(fieldError.message)}
            </p>
          )}
        </div>
      );
    }

    // 2. CURRENCY INPUT -> NPR / USD with localization help
    if (isCurrency(field)) {
      return (
        <div key={field.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-1.5 text-foreground">
              {field.description || field.name}
              {field.required && <span className="text-destructive font-bold">*</span>}
              {!field.required && <span className="text-xs text-muted-foreground font-normal">(Optional)</span>}
            </Label>
            {field.description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs bg-popover border border-border text-popover-foreground">
                  <p>{field.description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="relative flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm font-semibold select-none">
              {isUSD ? "$" : "रू"}
            </span>
            <Input
              type="number"
              placeholder={field.placeholder || "0"}
              {...register(field.name, {
                valueAsNumber: true,
                required: field.required ? "This field is required" : false,
                min: field.min !== undefined ? { value: field.min, message: `Minimum is ${field.min}` } : undefined,
                max: field.max !== undefined ? { value: field.max, message: `Maximum is ${field.max}` } : undefined,
              })}
              className={cn(
                "rounded-l-none focus-visible:ring-1 focus-visible:ring-ring",
                fieldError && "border-destructive focus-visible:ring-destructive"
              )}
            />
          </div>
          {value !== undefined && value !== null && !isNaN(Number(value)) && value !== "" && (
            <motion.p
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-blue-400 font-medium px-1"
            >
              Equivalent: {isUSD ? "$" : "रू"} {Number(value).toLocaleString(isUSD ? "en-US" : "ne-NP")}
            </motion.p>
          )}
          {fieldError && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {String(fieldError.message)}
            </p>
          )}
        </div>
      );
    }

    // 3. PERCENTAGE INPUT -> suffix %
    if (isPercentage(field)) {
      return (
        <div key={field.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-1.5 text-foreground">
              {field.description || field.name}
              {field.required && <span className="text-destructive font-bold">*</span>}
              {!field.required && <span className="text-xs text-muted-foreground font-normal">(Optional)</span>}
            </Label>
            {field.description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs bg-popover border border-border text-popover-foreground">
                  <p>{field.description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="relative flex rounded-md shadow-sm">
            <Input
              type="number"
              step="any"
              placeholder="0"
              {...register(field.name, {
                valueAsNumber: true,
                required: field.required ? "This field is required" : false,
                min: field.min !== undefined ? { value: field.min, message: `Minimum is ${field.min}%` } : undefined,
                max: field.max !== undefined ? { value: field.max, message: `Maximum is ${field.max}%` } : undefined,
              })}
              className={cn(
                "rounded-r-none focus-visible:ring-1 focus-visible:ring-ring",
                fieldError && "border-destructive focus-visible:ring-destructive"
              )}
            />
            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm font-semibold select-none">
              %
            </span>
          </div>
          {fieldError && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {String(fieldError.message)}
            </p>
          )}
        </div>
      );
    }

    // 4. BOOLEAN INPUT -> Toggle switch
    if (field.type === "boolean") {
      return (
        <div
          key={field.name}
          className={cn(
            "flex items-center justify-between p-3.5 rounded-lg border transition-all duration-200",
            value === true
              ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30"
              : "bg-secondary/15 border-border/10",
            fieldError && "border-destructive/40 bg-destructive/5"
          )}
        >
          <div className="flex flex-col gap-0.5 flex-1 pr-4">
            <Label className="text-sm font-medium cursor-pointer text-foreground flex items-center gap-1.5">
              {field.description || field.name}
              {field.required && <span className="text-destructive font-bold">*</span>}
            </Label>
            <span className="text-xs text-muted-foreground">
              {value === true ? "Yes / True" : "No / False"}
            </span>
          </div>
          <Controller
            name={field.name}
            control={control}
            defaultValue={false}
            render={({ field: { value: switchValue, onChange } }) => (
              <Switch
                checked={!!switchValue}
                onCheckedChange={onChange}
              />
            )}
          />
        </div>
      );
    }

    // 5. CATEGORICAL INPUT -> Searchable Combobox
    if (field.type === "categorical") {
      const options = field.options || [];
      return (
        <div key={field.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-1.5 text-foreground">
              {field.description || field.name}
              {field.required && <span className="text-destructive font-bold">*</span>}
              {!field.required && <span className="text-xs text-muted-foreground font-normal">(Optional)</span>}
            </Label>
            {field.description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs bg-popover border border-border text-popover-foreground">
                  <p>{field.description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <Popover
            open={openCombobox[field.name]}
            onOpenChange={(open) =>
              setOpenCombobox((prev) => ({ ...prev, [field.name]: open }))
            }
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCombobox[field.name]}
                className={cn(
                  "w-full justify-between font-normal text-left h-10 border border-input bg-background/50 hover:bg-accent/10 hover:text-accent-foreground",
                  !value && "text-muted-foreground",
                  fieldError && "border-destructive focus-visible:ring-destructive"
                )}
              >
                {value ? String(value) : `Select ${field.description?.toLowerCase() || "option"}`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-popover border border-border" align="start">
              <Command>
                <CommandInput placeholder={`Search ${field.description?.toLowerCase()}...`} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((opt) => (
                      <CommandItem
                        key={opt}
                        value={opt}
                        onSelect={() => {
                          setValue(field.name, opt, { shouldValidate: true });
                          setOpenCombobox((prev) => ({ ...prev, [field.name]: false }));
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === opt ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {opt}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {fieldError && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {String(fieldError.message)}
            </p>
          )}
        </div>
      );
    }

    // 6. DEFAULT INPUT (Text or Numbers)
    return (
      <div key={field.name} className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium flex items-center gap-1.5 text-foreground">
            {field.description || field.name}
            {field.required && <span className="text-destructive font-bold">*</span>}
            {!field.required && <span className="text-xs text-muted-foreground font-normal">(Optional)</span>}
          </Label>
          {field.description && (
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs bg-popover border border-border text-popover-foreground">
                <p>{field.description}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <Input
          type={field.type === "number" ? "number" : "text"}
          placeholder={field.placeholder || `Enter ${field.description?.toLowerCase() || "value"}`}
          {...register(field.name, {
            valueAsNumber: field.type === "number",
            required: field.required ? "This field is required" : false,
            min: field.min !== undefined ? { value: field.min, message: `Minimum value is ${field.min}` } : undefined,
            max: field.max !== undefined ? { value: field.max, message: `Maximum value is ${field.max}` } : undefined,
          })}
          className={cn(
            "focus-visible:ring-1 focus-visible:ring-ring",
            fieldError && "border-destructive focus-visible:ring-destructive"
          )}
        />
        {fieldError && (
          <p className="text-xs text-destructive flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {String(fieldError.message)}
          </p>
        )}
      </div>
    );
  };

  const handleFormSubmit = (data: ManualPredictionFormData) => {
    onSubmit(data);
  };

  return (
    <TooltipProvider>
      <form
        ref={formRef}
        onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
        className="space-y-6 pb-24 lg:pb-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Input Sections (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Global Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive">
                    Prediction Error
                  </p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </motion.div>
            )}

            {Object.keys(errors).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <p className="font-semibold text-destructive">
                    Validation Errors Detected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please correct the highlighted fields in the sections below before predicting. We have auto-expanded the first error.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Render Sections */}
            <div className="space-y-4">
              {sortedSections.map(([sectionName, sectionFields], index) => {
                const status = getSectionStatus(sectionFields);
                const sectionId = `section-${sectionName.replace(/\s+/g, "-")}`;
                
                return (
                  <motion.div
                    key={sectionName}
                    id={sectionId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Card className="overflow-hidden border-border/30 bg-card/40 backdrop-blur-md hover:border-border/50 transition-all duration-300 shadow-md">
                      
                      {/* Section Header */}
                      <button
                        type="button"
                        onClick={() => toggleSection(sectionName)}
                        className={cn(
                          "w-full flex items-center justify-between p-4.5 hover:bg-secondary/15 transition-all duration-200 group text-left",
                          expandedSections[sectionName] && "border-b border-border/10 bg-secondary/5"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {renderSectionHeaderStatus(status)}
                          <div className="flex flex-col gap-0.5">
                            <h3 className="font-semibold text-foreground text-sm md:text-base">
                              {sectionName}
                            </h3>
                            <span className="text-xs text-muted-foreground">
                              {sectionFields.filter((f) => f.required).length} required
                              {sectionFields.length >
                                sectionFields.filter((f) => f.required).length &&
                                ` • ${sectionFields.length - sectionFields.filter((f) => f.required).length} optional`}
                            </span>
                          </div>
                        </div>
                        <motion.div
                          animate={{
                            rotate: expandedSections[sectionName] ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </motion.div>
                      </button>

                      {/* Section Content */}
                      <AnimatePresence initial={false}>
                        {expandedSections[sectionName] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-border/10 bg-secondary/5">
                              {sectionFields.map((field, fieldIndex) => (
                                <motion.div
                                  key={field.name}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: fieldIndex * 0.02 }}
                                  className={cn(
                                    "w-full",
                                    field.type === "boolean" && "md:col-span-2"
                                  )}
                                >
                                  {renderField(field)}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Summary Card (1/3 width) */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
            <Card className="border-border/30 bg-card/65 backdrop-blur-xl shadow-lg">
              <CardHeader className="pb-4 border-b border-border/10 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Prediction Progress
                </CardTitle>
                <CardDescription>
                  Status tracker for required inputs
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-5 space-y-5">
                
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Required Fields Completed</span>
                    <span className="font-bold text-blue-500">{completionPercentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary/50 overflow-hidden border border-border/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>
                      {filledRequiredFields.length} of {requiredFields.length} filled
                    </span>
                    <span>
                      {filledOptionalFields.length} optional inputs added
                    </span>
                  </div>
                </div>

                {/* Section checklist */}
                <div className="space-y-1.5 border-t border-b border-border/10 py-4 max-h-[300px] overflow-y-auto">
                  {sortedSections.map(([sectionName, sectionFields]) => {
                    const status = getSectionStatus(sectionFields);
                    const requiredCount = sectionFields.filter((f) => f.required).length;
                    
                    return (
                      <div
                        key={sectionName}
                        onClick={() => {
                          setExpandedSections((prev) => ({ ...prev, [sectionName]: true }));
                          const sectionId = `section-${sectionName.replace(/\s+/g, "-")}`;
                          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-secondary/20 cursor-pointer transition-colors group"
                      >
                        <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {sectionName}
                        </span>
                        <div className="flex items-center gap-2">
                          {requiredCount > 0 && (
                            <span className="text-[10px] font-semibold text-muted-foreground/60">
                              {sectionFields.filter((f) => f.required && formValues[f.name] !== undefined && formValues[f.name] !== "" && formValues[f.name] !== null && !Number.isNaN(formValues[f.name])).length} / {requiredCount}
                            </span>
                          )}
                          {renderSectionHeaderStatus(status)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Info Disclaimer */}
                <div className="flex gap-2.5 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[11px] text-muted-foreground">
                  <Briefcase className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <p>
                    Ensure your entries are accurate. The predictive engine uses deep demographic alignments to calculate brain drain risk.
                  </p>
                </div>

                {/* Desktop Buttons */}
                <div className="space-y-2 pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold shadow-md hover:shadow-lg disabled:opacity-50 transition-all duration-300"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white mr-2"
                        />
                        Analyzing...
                      </>
                    ) : (
                      "🚀 Predict Brain Drain"
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      reset();
                      setExpandedSections({ "Personal Information": true });
                    }}
                    disabled={isLoading}
                    className="w-full gap-2 border-border/40 hover:bg-secondary/40 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Details
                  </Button>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>

        {/* Mobile Sticky Action Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/90 border-t border-border/30 backdrop-blur-md z-40 shadow-xl flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs px-1">
            <span className="font-semibold text-muted-foreground">Form Progress</span>
            <span className="font-bold text-blue-500">{completionPercentage}%</span>
          </div>
          <div className="h-1 w-full bg-secondary/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex gap-2 mt-1">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold h-11"
            >
              {isLoading ? "Analyzing..." : "🚀 Predict Brain Drain"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                reset();
                setExpandedSections({ "Personal Information": true });
              }}
              disabled={isLoading}
              className="w-11 h-11"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </form>
    </TooltipProvider>
  );
}
