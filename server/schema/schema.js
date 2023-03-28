const SwapiMovieType = require("../types/SwapiMovieType.js");
const SwapiPersonType = require("../types/SwapiPersonType.js");
const CountryNewsType = require("../types/CountryNewsType.js");
const { postQueryResp, postOriginResp } = require("fetch-errorqller");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Movie: {
      type: SwapiMovieType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args, context, info) {
        try {
          // fetch address is entered incorrectly (missing "i" after "swap")
          const response = await fetch(
            `https://swapi.dev/api/films/${args.id}`,
            {
              headers: { "content-type": "application/json" },
            }
          );
          const film = await response.json();
          /////////////////////////////////////////////////////
          postOriginResp(response, film, info);
          return film;
        } catch (err) {
          console.error("Error fetching movie:", err);
          throw new Error("Unable to fetch movie");
        }
      },
    },
    Person: {
      type: SwapiPersonType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args, context, info) {
        try {
          // fetch address is entered incorrectly (missing "i" after "swap")
          const response = await fetch(
            `https://swapi.dev/api/people/${args.id}`,
            {
              headers: { "content-type": "application/json" },
            }
          );
          const person = await response.json();
          /////////////////////////////////////////////////////
          postOriginResp(response, person, info);
          ////////////
          return person;
        } catch (err) {
          console.error("Error fetching person:", err);
          throw new Error("Unable to fetch person");
        }
      },
    },
    CountryNews: {
      type: CountryNewsType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args, context, info) {
        try {
          // fetch address is entered incorrectly (missing "i" after "swap")
          const response = await fetch(
            `https://newsdata.io/api/1/news?apikey=pub_17860d5d4de387f07197443f4724ec938c4f9&country=${args}`,
            {
              headers: {
                API_key: "pub_17860d5d4de387f07197443f4724ec938c4f9",
                "content-type": "application/json",
              },
            }`https://swapi.dev/api/people/${args.id}`
          );
          const news = await response.json();
          //////////////
          postOriginResp(response, news, info);
          ///////////////
          return news;
        } catch (err) {
          console.error("Error fetching news:", err);
          throw new Error("Unable to fetch news");
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
