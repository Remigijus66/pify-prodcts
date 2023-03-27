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
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });


  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  // const handlePopulate = async () => {
  //   setIsLoading(true);
  //   const response = await fetch("/api/products/create");

  //   if (response.ok) {
  //     await refetchProductCount();
  //     setToastProps({ content: "5 products created!" });
  //   } else {
  //     setIsLoading(false);
  //     setToastProps({
  //       content: "There was an error creating products",
  //       error: true,
  //     });
  //   }
  // };

  const handlePopulate = async () => {
    const pData = data.filter(x => (x.title[0] === 'P' || x.title === 'p'))
    console.log(data)
    console.log(data[15].title[0])
    // console.log(data.filter((x) => { (x.title === 'P-Snowboard') }))
    console.log(pData)


    // setIsLoading(true);
    // const response = await fetch("/api/products/create");



    // if (response.ok) {
    //   // await refetchProductCount();
    //   setToastProps({ content: "5 products created!" });
    // } else {
    //   setIsLoading(false);
    //   setToastProps({
    //     content: "There was an error creating products",
    //     error: true,
    //   });
    // }
  };

  return (
    <>
      {toastMarkup}
      <Card
        title="'P'-fied  PRODUCTS"
        sectioned
      // primaryFooterAction={{
      //   content: "Populate 5 products",
      //   onAction: handlePopulate,
      //   loading: isLoading,
      // }}
      >
        <TextContainer spacing="loose">
          {/* <p>
            Sample products are created with a default title and price. You can
            remove them at any time.
          </p> */}
          <Heading element="h4">
            {/* 'P'-fied  PRODUCTS */}
            <DisplayText size="small">
              <TextStyle variation="strong">
                {isLoadingCount ? "-" : data.count}
                {isLoadingCount ? "-" : data.filter(x => (x.title[0] === 'P' || x.title === 'p')).map(x => <p>{x.title}</p>)}
              </TextStyle>

            </DisplayText>
          </Heading>
        </TextContainer>
      </Card>
    </>
  );
}
