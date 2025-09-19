import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createShippingAddress } from "@/actions/create-shipping-address";
import { CreateShippingAddressSchema } from "@/actions/create-shipping-address/schema";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { getUseShippingAddressesQueryKey } from "@/hooks/queries/use-user-addresses";

export const getCreateShippingAddressMutationKey = () => [
  "create-shipping-address",
];

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getCreateShippingAddressMutationKey(),
    mutationFn: (data: CreateShippingAddressSchema) =>
      createShippingAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
      queryClient.invalidateQueries({
        queryKey: getUseShippingAddressesQueryKey(),
      });
    },
  });
};
