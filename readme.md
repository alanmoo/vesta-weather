A node package that allows you to display a visual representation of the weather on your Vestaboard, using colors to indicate intesnsity of each of four measurements: temperature, humidity, wind, and precipitation.

As it stands, it's an MVP for me (with NYC weather hard-coded), but I aim to clean it up and allow configuration.

This is designed as a node function so that I could put it up on a web endpoint (I've got it hosted at a Next.JS API endpoint on Vercel) and use shortcuts on iOS to request the weather, integrating it into my home automation setup.

![Vestaboard representation of the weather](./vestaweather.png)

[Video demo](https://www.youtube.com/shorts/_xjFq7M9njw)


# Weatherkit API
The AuthKey for Apple's Weatherkit service is in this repo locally, but not committed to GitHub for security reasons. To generate a new Auth Bearer token, execute `getWeatherkitToken.ts` (`ts-node src/getWeatherkitToken.ts` from the project directory). The console logged token can be used with the instructions on [Apple's Dev Center](https://developer.apple.com/documentation/weatherkitrestapi/request_authentication_for_weatherkit_rest_api).

(Before shipping this to production for anyone but me I'd figure out a way to not need to do this manually)