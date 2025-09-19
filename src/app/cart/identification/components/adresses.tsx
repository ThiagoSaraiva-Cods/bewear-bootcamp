"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useUserAddresses } from "@/hooks/queries/use-user-addresses";

import { AddressForm } from "./address-form";

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
}

export const Addresses = ({ shippingAddresses }: AddressesProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { data: addresses, isLoading } = useUserAddresses({
    initialData: shippingAddresses,
  });

  return (
    <div className="px-5">
      <Card>
        <CardHeader>
          <CardTitle>Identificação</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
          >
            {isLoading ? (
              <div className="py-4 text-center">Carregando endereços...</div>
            ) : (
              addresses?.map((address) => (
                <Card key={address.id}>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={address.id} id={address.id} />
                      <Label
                        htmlFor={address.id}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="text-sm">
                          {address.recipientName} - {address.street},{" "}
                          {address.number}
                          {address.complement &&
                            `, ${address.complement}`}, {address.neighborhood},{" "}
                          {address.city} - {address.state}, CEP:{" "}
                          {address.zipCode}
                        </div>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            <Card>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add_new" id="add_new" />
                  <Label htmlFor="add_new">Adicionar novo endereço</Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>

          {selectedAddress === "add_new" && (
            <div className="mt-6">
              <AddressForm />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
