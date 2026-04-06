import React from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "expo-router";

import { AppText } from "../../src/components/ui/AppText";
import { AppInput } from "../../src/components/ui/AppInput";
import { AppButton } from "../../src/components/ui/AppButton";
import { ScreenWrapper } from "../../src/components/ui/ScreenWrapper";
import { useToaster } from "../../src/hooks/useToaster";

const orderSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
});

type OrderFormData = z.infer<typeof orderSchema>;

export default function AddOrderScreen() {
  const { toastAlert } = useToaster();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: "",
      amount: "",
    },
  });

  const onSubmit = async (data: OrderFormData) => {
    try {
      // Simulate DB save
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Order data:", data);

      toastAlert("Order created successfully!", true);
      reset();
      router.push("/orders");
    } catch (_error) {
      toastAlert("Failed to create order", false);
    }
  };

  return (
    <ScreenWrapper scrollable title="New Order">
      <View className="py-4">
        <AppText variant="h1" className="mb-2">
          Create New Order
        </AppText>
        <AppText variant="body" className="text-slate-500 mb-8">
          Fill in the details below to register a new transaction.
        </AppText>

        <View className="gap-y-4">
          <Controller
            control={control}
            name="customerName"
            render={({ field: { onChange, value, onBlur } }) => (
              <AppInput
                label="Customer Name"
                placeholder="e.g. John Doe"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.customerName?.message}
                autoCapitalize="words"
              />
            )}
          />

          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value, onBlur } }) => (
              <AppInput
                label="Order Amount ($)"
                placeholder="0.00"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.amount?.message}
                keyboardType="numeric"
              />
            )}
          />
        </View>

        <AppButton
          title="Create Order"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          className="mt-10"
        />
      </View>
    </ScreenWrapper>
  );
}
