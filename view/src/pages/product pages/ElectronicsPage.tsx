import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { ElectronicProducts } from "../../utils/types";
import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { DebounceInput } from "react-debounce-input";
import {
  sortByCategory,
  sortByPhone,
  sortByLaptop,
  sortByTv,
} from "../../config/electronicData";

const ElectronicsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sortPrice, setSortPrice] = useState("");
  const [order, setOrder] = useState("discount_price");
  const [limit, setLimit] = useState<string | number>(25);

  const getData = async () => {
    setLoading(true);
    await axios
      .get(
        `https://e-shop-215k.onrender.com/electronics?page=${page}&limit=${limit}&category=${category}&brand=${brand}&sort=${order},${sortPrice}&search=${search}`
      )
      .then((res: AxiosResponse) => {
        setData(res.data.electronics);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [page, category, brand, sortPrice, limit, search]);

  return (
    <>
      {loading ? (
        <Center m="50px">
          <Image src="/loader.gif" alt="loader" />
        </Center>
      ) : (
        <Box>
          <Flex
            w="95%"
            flexDirection={{ base: "column", md: "row" }}
            alignItems={"center"}
          >
            <Box>
              <Link href={"/electronics"}>
                <Heading color={"#f24973"} m="25px">
                  ELECTRONICS COLLECTION
                </Heading>
              </Link>
            </Box>
            <Flex
              w={{ base: "100%", md: "60%", lg: "75%" }}
              alignItems={"center"}
              border={"solid 1px pink"}
              h={"50px"}
            >
              <Box
                ml="20px"
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <DebounceInput
                style={{
                  marginLeft: "20px",
                  width: "100%",
                  border: "none",
                  borderColor: "transparent",
                  padding: "10px",
                  outline: "none",
                }}
                debounceTimeout={2000}
                value={search}
                placeholder="Search in Electronics-Collection"
                onChange={handleChange}
              />
            </Flex>
          </Flex>
          <Flex
            w="98%"
            m="auto"
            gap={{ base: 2, lg: 5 }}
            justifyContent={"center"}
          >
            <Box
              boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              w={{ base: "25%", lg: "20%" }}
              display={"flex"}
              flexDirection={"column"}
              mt="20px"
            >
              <Text
                fontWeight={"bold"}
                mt="20px"
                fontSize={{ base: "15px", lg: "20px" }}
                color={"#f24973"}
              >
                Filters
              </Text>
              <Box bgColor={"gray.100"} p="20px" mt="15px" lineHeight={"30px"}>
                <Text
                  color={"#f24973"}
                  fontSize={{ base: "12px", lg: "15px" }}
                  mb="10px"
                >
                  Items Per Page
                </Text>
                <hr />
                <Flex justifyContent={"center"} m="auto" gap="10px">
                  <select
                    onChange={(e) => setLimit(e.target.value)}
                    style={{ width: "80px" }}
                  >
                    <option value={15}>Default</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                  </select>
                </Flex>
              </Box>
              <Box bgColor={"gray.100"} p="20px" mt="15px" lineHeight={"30px"}>
                <Text
                  color={"#f24973"}
                  fontSize={{ base: "12px", lg: "15px" }}
                  mb="10px"
                  fontWeight={"600"}
                >
                  SORT BY CATEGORY
                </Text>
                <hr />
                {sortByCategory.map((el, i) => (
                  <Flex
                    key={i}
                    justifyContent={"space-between"}
                    m="auto"
                    gap="10px"
                    w="80%"
                  >
                    <Text fontSize={{ base: "10px", md: "12px", lg: "15px" }}>
                      {el}
                    </Text>
                    <input
                      type="checkbox"
                      value={el}
                      checked={category === el}
                      onChange={() => setCategory(el)}
                    />
                  </Flex>
                ))}
              </Box>

              <Box bgColor={"gray.100"} p="20px" mt="15px" lineHeight={"30px"}>
                <Text
                  color={"#f24973"}
                  fontSize={{ base: "12px", lg: "15px" }}
                  mb="10px"
                  fontWeight={"600"}
                >
                  SORT BY BRAND
                </Text>
                <hr />
                <Flex
                  w="80%"
                  justifyContent={"space-between"}
                  m="auto"
                  gap="10px"
                >
                  <Text fontSize={{ base: "10px", md: "12px", lg: "15px" }}>
                    All
                  </Text>
                  <input
                    type="radio"
                    checked={brand === "All"}
                    onChange={() => setBrand("All")}
                  />
                </Flex>
                <hr />

                <Flex
                  justifyContent={"center"}
                  w={{ lg: "55%" }}
                  alignItems={"center"}
                  gap="10px"
                  mt="10px"
                >
                  <Text
                    color="blue"
                    fontSize={{ base: "8px", md: "10px", lg: "13px" }}
                  >
                    TV Brands
                  </Text>
                  <ArrowDownIcon />
                </Flex>
                <hr />
                {sortByTv.map((el: any, i: number) => (
                  <Flex
                    w="80%"
                    key={i}
                    justifyContent={"space-between"}
                    m="auto"
                    gap="10px"
                  >
                    <Text fontSize={{ base: "10px", md: "12px", lg: "15px" }}>
                      {el}
                    </Text>
                    <input
                      type="radio"
                      checked={brand === el}
                      onChange={() => setBrand(el)}
                    />
                  </Flex>
                ))}
                <Flex
                  justifyContent={"center"}
                  w={{ lg: "66%" }}
                  alignItems={"center"}
                  mt="10px"
                  gap="10px"
                >
                  <Text
                    color="blue"
                    fontSize={{ base: "8px", md: "10px", lg: "13px" }}
                  >
                    Laptop Brands
                  </Text>
                  <ArrowDownIcon />
                </Flex>
                <hr />
                {sortByLaptop.map((el: any, i: number) => (
                  <Flex
                    w="80%"
                    key={i}
                    justifyContent={"space-between"}
                    m="auto"
                    gap="10px"
                  >
                    <Text fontSize={{ base: "10px", md: "12px", lg: "15px" }}>
                      {el}
                    </Text>
                    <input
                      type="radio"
                      checked={brand === el}
                      onChange={() => setBrand(el)}
                    />
                  </Flex>
                ))}
                <Flex
                  justifyContent={"center"}
                  w={{ lg: "62%" }}
                  alignItems={"center"}
                  mt="10px"
                  gap="10px"
                >
                  <Text
                    color="blue"
                    fontSize={{ base: "8px", md: "10px", lg: "13px" }}
                  >
                    Phone Brands
                  </Text>
                  <ArrowDownIcon />
                </Flex>
                <hr />
                {sortByPhone.map((el: any, i: number) => (
                  <Flex
                    w="80%"
                    key={i}
                    justifyContent={"space-between"}
                    m="auto"
                    gap="10px"
                  >
                    <Text fontSize={{ base: "10px", md: "12px", lg: "15px" }}>
                      {el}
                    </Text>
                    <input
                      type="radio"
                      checked={brand === el}
                      onChange={() => setBrand(el)}
                    />
                  </Flex>
                ))}
              </Box>
              <Box bgColor={"gray.100"} p="20px" mt="15px" lineHeight={"30px"}>
                <Text
                  color={"#f24973"}
                  fontSize={{ base: "12px", lg: "15px" }}
                  mb="10px"
                >
                  SORT BY PRICE
                </Text>
                <hr />
                <Flex
                  justifyContent={"center"}
                  flexDirection={{ base: "column", md: "row" }}
                  m="auto"
                  gap="10px"
                >
                  <select
                    onChange={(e) => setOrder(e.target.value)}
                    style={{ width: "80px" }}
                  >
                    <option>Sort By</option>
                    <option value="rating">Rating</option>
                    <option value="discount_price">Price</option>
                  </select>
                  <select
                    onChange={(e) => setSortPrice(e.target.value)}
                    style={{ width: "80px" }}
                  >
                    <option>Order</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                  </select>
                </Flex>
              </Box>
            </Box>

            <Box
              //   border={"solid 1px red"}
              w={{ base: "70%", lg: "75%" }}
              display={"grid"}
              gridTemplateColumns={{
                base: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
                lg: "repeat(4,1fr)",
              }}
              justifyContent={"center"}
              gap={{ base: "0px", lg: "20px" }}
            >
              {data.map((el: ElectronicProducts) => (
                <>
                  {el.visible === true ? (
                    <Box
                      p={{ base: "2px", lg: "20px" }}
                      borderRadius={"10%"}
                      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                      m="auto"
                      mt="25px"
                      h={{ base: "280px", md: "370px", lg: "470px" }}
                    >
                      <Link href={`/electronics/${el._id}`}>
                        <Image
                          m="auto"
                          w={{ base: "100px", md: "180px", lg: "200px" }}
                          h={{ base: "150px", md: "250px", lg: "270px" }}
                          src={el.image}
                          alt="product_img"
                        />

                        <Flex
                          justifyContent={"center"}
                          w={{ base: "100px", md: "180px", lg: "200px" }}
                          m="auto"
                        >
                          <Text
                            m="auto"
                            whiteSpace={"nowrap"}
                            overflow={"hidden"}
                            mt="15px"
                            fontWeight={"bold"}
                            textAlign={"center"}
                            w={{ base: "90px", md: "180px", lg: "250px" }}
                            fontSize={{
                              base: "12px",
                              md: "14px",
                              lg: "16.5px",
                            }}
                          >
                            {el.title}
                          </Text>
                          <Text
                            ml="-7px"
                            w={{ base: "10px", md: "10px", lg: "30px" }}
                          >
                            ..
                          </Text>
                        </Flex>
                      </Link>
                      <Text
                        fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                        color="green"
                      >
                        {el.discount}
                      </Text>
                      <Flex justifyContent={"center"} gap="15px">
                        <Text
                          fontSize={{ base: "12px", md: "15px", lg: "18px" }}
                          fontWeight={"600"}
                        >
                          ₹{el.discount_price}
                        </Text>
                        <Text
                          color="red"
                          fontSize={{ base: "12px", md: "15px", lg: "18px" }}
                          textDecoration={"line-through"}
                          fontWeight={"600"}
                        >
                          ₹{el.original_price}
                        </Text>
                      </Flex>
                      <Text
                        fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                        color="blue"
                      >
                        {el.reviews === ""
                          ? Math.ceil(Math.random() * 20000) + " Reviews"
                          : el.reviews}
                      </Text>
                      <Text
                        fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                        color="green"
                      >
                        {el.rating === null
                          ? Math.ceil(Math.random() * 5)
                          : Number(el.rating)}
                      </Text>
                      <Text
                        fontSize={{ base: "10px", md: "14px", lg: "16.5px" }}
                      >
                        {el.offer}
                      </Text>
                      {el.availability === "" ? (
                        ""
                      ) : (
                        <Text
                          color="red"
                          fontSize={{ base: "12px", lg: "16.5px" }}
                        >
                          {el.availability}
                        </Text>
                      )}
                    </Box>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </Box>
          </Flex>
          <Flex gap="20px" justifyContent={"center"} m="auto" mt="30px">
            <Button
              color={"#f24973"}
              leftIcon={<ArrowBackIcon />}
              isDisabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button isDisabled color={"#f24973"} disabled>
              {page}
            </Button>
            <Button
              color={"#f24973"}
              rightIcon={<ArrowForwardIcon />}
              isDisabled={page === 13}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default ElectronicsPage;
