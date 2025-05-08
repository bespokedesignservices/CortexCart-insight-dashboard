
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Trash2, Plus, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const paymentMethodSchema = z.object({
  cardName: z.string().min(3, "Name on card is required"),
  cardNumber: z.string().regex(/^[0-9]{16}$/, "Card number must be 16 digits"),
  expiryMonth: z.string().min(1, "Expiry month is required"),
  expiryYear: z.string().min(1, "Expiry year is required"),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
  setAsDefault: z.boolean().default(false),
});

type PaymentMethodForm = z.infer<typeof paymentMethodSchema>;

interface PaymentMethod {
  id: string;
  cardType: string;
  lastFour: string;
  expiryDate: string;
  cardHolder: string;
  isDefault: boolean;
}

const PaymentMethods: React.FC = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      cardType: "Visa",
      lastFour: "4242",
      expiryDate: "06/2025",
      cardHolder: "John Doe",
      isDefault: true,
    },
    {
      id: "pm_2",
      cardType: "Mastercard",
      lastFour: "5678",
      expiryDate: "09/2024",
      cardHolder: "John Doe",
      isDefault: false,
    },
  ]);
  const [showAddCard, setShowAddCard] = useState(false);

  const form = useForm<PaymentMethodForm>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      setAsDefault: false,
    },
  });

  const onSubmit = (values: PaymentMethodForm) => {
    // Create a new payment method
    const newPaymentMethod: PaymentMethod = {
      id: `pm_${Math.random().toString(36).substr(2, 9)}`,
      cardType: "Visa", // This would be determined by the card number in a real implementation
      lastFour: values.cardNumber.slice(-4),
      expiryDate: `${values.expiryMonth}/${values.expiryYear}`,
      cardHolder: values.cardName,
      isDefault: values.setAsDefault,
    };

    // If setting as default, update other cards
    const updatedMethods = values.setAsDefault
      ? paymentMethods.map(method => ({
          ...method,
          isDefault: false,
        }))
      : [...paymentMethods];

    // Add the new card
    setPaymentMethods([...updatedMethods, newPaymentMethod]);
    
    // Reset form & hide add card form
    form.reset();
    setShowAddCard(false);
    
    toast({
      title: "Payment method added",
      description: `Card ending in ${newPaymentMethod.lastFour} has been added successfully.`,
    });
  };

  const handleDeleteCard = (id: string) => {
    const methodToDelete = paymentMethods.find(method => method.id === id);
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    
    toast({
      title: "Payment method removed",
      description: `Card ending in ${methodToDelete?.lastFour} has been removed.`,
    });
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    
    const methodToDefault = paymentMethods.find(method => method.id === id);
    toast({
      title: "Default payment method updated",
      description: `Card ending in ${methodToDefault?.lastFour} is now your default payment method.`,
    });
  };

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return month < 10 ? `0${month}` : `${month}`;
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => `${currentYear + i}`);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Payment Methods</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-recoai-purple" />
            Your Payment Methods
          </CardTitle>
          <CardDescription>
            Manage your payment methods for subscription and purchases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {paymentMethods.length > 0 ? (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-2 rounded">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {method.cardType} •••• {method.lastFour}
                        {method.isDefault && (
                          <span className="ml-2 text-xs bg-recoai-purple text-white rounded-full px-2 py-0.5">
                            Default
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteCard(method.id)}
                      disabled={method.isDefault && paymentMethods.length > 1}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">You have no payment methods saved.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full flex items-center gap-2"
            variant={showAddCard ? "outline" : "default"}
            onClick={() => setShowAddCard(!showAddCard)}
          >
            {showAddCard ? "Cancel" : <><Plus className="h-4 w-4" /> Add New Payment Method</>}
          </Button>
        </CardFooter>
      </Card>

      {showAddCard && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Card</CardTitle>
            <CardDescription>Enter your card details to add a new payment method.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="cardName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Card</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="cardNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="4111 1111 1111 1111" {...field} maxLength={16} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-3 gap-4">
                  <FormField control={form.control} name="expiryMonth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Month</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {months.map(month => (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="expiryYear" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Year</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map(year => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="cvv" render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} maxLength={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="setAsDefault" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Set as default payment method</FormLabel>
                    </div>
                  </FormItem>
                )} />
                
                <Button type="submit" className="w-full mt-4">Add Payment Method</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentMethods;
