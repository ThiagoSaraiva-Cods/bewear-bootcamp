import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseProductQuantityInCart } from "@/actions/decrease-cart-product-quantity";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getDecreaseCartProductQuantityMutationKey = (cartItemId: string) =>
  ["decrease-cart-product-quantity", cartItemId] as const;

export const useDecreaseCartProductQuantity = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDecreaseCartProductQuantityMutationKey(cartItemId),
    mutationFn: () =>
      decreaseProductQuantityInCart({
        cartItemId: cartItemId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },
  });
};
