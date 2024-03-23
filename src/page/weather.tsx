import { useEffect, useState } from 'react';
import { Box, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { getWeather, WeatherItem } from '@/api/weatherApi';

export const Weather = () => {
  const MAX_WEATHER = 7;
  const [weather, setWeather] = useState<Array<WeatherItem>>([]);
  useEffect(() => {
    getWeather().then((result) => {
      console.log('🚀 ~ getWeather ~ result:', result);
      if (result) {
        // 今の時間以降、MAX7つの予報を取得
        const firstItem = result.list.findIndex(
          (l) => new Date(l.dt_txt).getTime() > new Date().getTime(),
        );
        setWeather(result.list.slice(firstItem, firstItem + MAX_WEATHER - 1));
      }
    });
  }, []);

  return (
    <Box alignItems="center">
      <Heading textAlign="center" color="teal.500">
        {format(new Date(), 'yyyy/MM/dd(E)', { locale: ja })}
      </Heading>
      <Flex
        width="100%"
        flex={weather.length}
        justifyContent="space-around"
        mt={5}
      >
        {weather.map((w, index) => {
          return (
            <Flex
              key={index}
              flex={1}
              flexDirection="column"
              alignItems="center"
              borderWidth={1}
              borderRightWidth={index === weather.length - 1 ? 1 : 0}
            >
              <Text textAlign="center" py={1} color="teal.500">
                {format(new Date(w.dt_txt), 'HH:mm')}
              </Text>
              <Divider />
              <Image
                boxSize="50px"
                objectFit="cover"
                src={`${import.meta.env.VITE_WEATHER_IMAGE_URL}/img/wn/${w.weather[0].icon}@2x.png`}
              />
              <Text textAlign="center" py={1} color="teal.500">
                {w.weather[0].main}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};
