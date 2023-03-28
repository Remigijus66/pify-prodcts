import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  DataTable,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function ProductsCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/p",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });


  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );


  return (
    <>
      {toastMarkup}
      <Card title="'P' PRODUCTS" sectioned>
        <TextContainer spacing="loose">
          <Heading element="h4">
            <DisplayText size="small">
              <TextStyle variation="strong">
                {/* {isLoadingCount ? "-" : data.filter(x => (x.title[0].match(/p/i) != null)).map(x => <p>{x.title}</p>)} */}
                {isLoadingCount ? "-" : data.map(x => <p>{x.title}</p>)}
              </TextStyle>
            </DisplayText>
          </Heading>
        </TextContainer>
      </Card>
    </>
  );
}
