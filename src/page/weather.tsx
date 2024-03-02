import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { getWeather, WeatherItem } from '@/api/getWeather';

export const Weather = () => {
  const [weather, setWeather] = useState<Array<WeatherItem>>([]);
  useEffect(() => {
    getWeather().then((result) => {
      if (result) {
        setWeather(result.list);
      }
    });
  }, []);

  return (
    <Box alignItems="center">
      <Heading textAlign="center" color="teal.500">
        {format(new Date(), 'yyyy/MM/dd(E)', { locale: ja })}
      </Heading>
      <Flex width="100%" justifyContent="space-around" mt={5}>
        {weather.map((w, index) => {
          return (
            <Box key={index}>
              <Text textAlign="center" color="teal.500">
                {format(new Date(w.dt_txt), 'HH:mm')}
              </Text>
              <Image
                boxSize="50px"
                objectFit="cover"
                src={`https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`}
              />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
