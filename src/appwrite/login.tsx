import {Client, Databases, Query, ID} from 'appwrite';
import Config from 'react-native-config';
import {Platform} from 'react-native';

const myConfig = Platform.OS === 'web' ? process.env : Config;
export class LoginDataService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(myConfig.REACT_APP_ENDPOINT)
      .setProject(myConfig.REACT_APP_PROJECT_ID);
    this.databases = new Databases(this.client);
  }

  async postLoginLocation(data: any) {
    const postData = {
      geoplugin_request: data?.geoplugin_request,
      city: data?.geoplugin_city,
      region: data?.geoplugin_region,
      country: data?.geoplugin_countryName,
      country_code: data?.geoplugin_countryCode,
      time_zone: data?.geoplugin_timezone,
      lat: data?.geoplugin_latitude,
      lng: data?.geoplugin_longitude,
      unique_id: data?.unique_id,
      device: data?.device,
      last_access: new Date(),
    };
    try {
      return await this.databases.createDocument(
        myConfig.REACT_APP_POSTS_DATABASE,
        myConfig.REACT_APP_LOGIN_LOCATION_COLLECTION,
        ID.unique(),
        postData,
      );
    } catch (error) {
      throw error;
    }
  }

  async getPrevLoginLocation(geoplugin_request: string) {
    const queries = [
      Query.equal('unique_id', geoplugin_request.toString()),
      Query.limit(10),
    ];
    try {
      const response = await this.databases.listDocuments(
        myConfig.REACT_APP_POSTS_DATABASE,
        myConfig.REACT_APP_LOGIN_LOCATION_COLLECTION,
        queries,
      );
      return response;
    } catch (error) {
      throw false;
    }
  }
  async increaseCount(prevData: any) {
    const newCount = prevData.count + 1;
    const postData = {
      device: 'ios',
      count: newCount,
      last_access: new Date(),
    };

    await this.databases.updateDocument(
      myConfig.REACT_APP_POSTS_DATABASE,
      myConfig.REACT_APP_LOGIN_LOCATION_COLLECTION,
      prevData?.$id,
      postData,
    );
  }
}

const loginDataService = new LoginDataService();
export default loginDataService;
