"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { AddressForm } from "./address-form";

export const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

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
