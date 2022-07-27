import * as React from "react";
import {
  ChakraProvider,
  Flex,
  Text,
  theme,
  Box,
  Center,
} from "@chakra-ui/react";
import Price from "./Price";

export const App = () => {
  const [init, setInit] = React.useState<any>([]);
  const [status, setStatus] = React.useState<any>("");
  const [symbols, setSymbols] = React.useState<any>([]);

  async function fetchInitialData() {
    let res = await fetch("https://api.delta.exchange/v2/products");
    let json = await res.json();
    const data: any = [];
    const symbols: string[] = [];
    json.result.splice(0, 25).forEach((i: any) => {
      symbols.push(i.symbol);
      data.push({
        symbol: i.symbol,
        description: i.description,
        underlying_asset: i.underlying_asset.symbol,
      });
    });
    setInit(data);
    setSymbols(symbols);
  }

  React.useEffect(() => {
    async function run() {
      await fetchInitialData();
    }
    run();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Center mt="10" flexDir="column">
        <Text fontSize="2xl" fontWeight="bold">
          Live Prices
        </Text>
        <Text>{status}</Text>
        <Flex
          border="1px"
          mt="5"
          mb="10"
          w="full"
          overflowY="auto"
          borderColor="blackAlpha.600"
          flexDir="column"
        >
          <Flex
            textAlign="center"
            flexDir="row"
            w="full"
            justify="space-between"
          >
            <Text
              borderBottom="1px"
              borderRight="1px"
              borderColor="blackAlpha.400"
              p="4"
              flex={2}
            >
              Symbol
            </Text>

            <Text
              p="4"
              flex={3}
              borderBottom="1px"
              borderRight="1px"
              borderColor="blackAlpha.400"
            >
              Description
            </Text>

            <Text
              p="4"
              flex={2}
              borderBottom="1px"
              borderRight="1px"
              borderColor="blackAlpha.400"
            >
              Underlying Asset
            </Text>

            <Text
              p="4"
              flex={1}
              borderBottom="1px"
              borderColor="blackAlpha.400"
            >
              Mark Price
            </Text>
          </Flex>

          <Flex
            h="80"
            overflow="auto"
            textAlign="center"
            flexDir="row"
            w="full"
            justify="space-between"
          >
            <Flex flex={2} h="full" borderColor="blackAlpha.400">
              <Box p="2" w="full" textAlign="center">
                {init.map((i: any, idx: number) => (
                  <Text noOfLines={1} py="2" key={idx}>
                    {i.symbol}
                  </Text>
                ))}
              </Box>
            </Flex>
            <Flex flex={3} borderColor="blackAlpha.600">
              <Box p="2" w="full" textAlign="center">
                {init.map((i: any, idx: number) => (
                  // <Text>{i.symbol}</Text>
                  <Text py="2" key={idx} noOfLines={1}>
                    {i.description || "-"}
                  </Text>
                ))}
              </Box>
            </Flex>
            <Flex flex={2}>
              <Box textAlign="center" w="full" p="2">
                {init.map((i: any, idx: number) => (
                  <Text py="2" key={idx}>
                    {i.underlying_asset}
                  </Text>
                ))}
              </Box>
            </Flex>
            <Flex flex={1}>
              <Box p="2" w="full">
                {symbols.map((i: any, idx: number) => (
                  <Price symbol={i} />
                ))}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </ChakraProvider>
  );
};
