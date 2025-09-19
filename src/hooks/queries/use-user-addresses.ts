import { useQuery } from "@tanstack/react-query";

import { getShippingAddresses } from "@/actions/get-shipping-addresses";

export const getUseShippingAddressesQueryKey = () => ["shipping-addresses"];

export const useShippingAddresses = () => {
  return useQuery({
    queryKey: getUseShippingAddressesQueryKey(),
    queryFn: getShippingAddresses,
  });
};
