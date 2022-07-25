/* Copyright (c) 2022 BlackBerry Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/
using System;
using Newtonsoft.Json;
using System.Threading.Tasks;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using System.Net;
using System.IO;                                      
using Newtonsoft.Json.Linq;

namespace CylanceSampleWPFApp
{
    /// <summary>
    /// Cylance class to contain the authorisation and following API call in a single instance. This is to encourage single autherisation token per API request.
    /// </summary>
    internal class Cylance
    {
        private const int TIMEOUTSECS = 1800;//TIMEOUTSECS is the duration a authorization token can be used in seconds untill it is no longer valid. This can be changed for specific use case.
        private readonly string TenantId;
        private readonly string AppId;
        private readonly string AppSecret;
        private readonly string EndpointRegion;

        /// <summary>
        /// Cylance class constructor will read the CylanceConfig.json for Cylance API keys:(TenantId, AppId, AppSecret). Thes API Keys are obtain on your Cylance Dashboard. The constructor will also insitialize the region endpoint. as per the parameter.
        /// </summary>
        /// <param name="regionCode">The region code to select the corresponding endpoint URI</param>
        /// <exception cref="Exception">Invalid region code</exception>
        public Cylance(string regionCode = "")
        {
            using (StreamReader sr = new StreamReader("CylanceConfig.json"))
            {
                string myJsonResponse = sr.ReadToEnd();
                CylanceConfig CylanceConfig = JsonConvert.DeserializeObject<CylanceConfig>(myJsonResponse);

                this.TenantId = CylanceConfig.TenantId;
                this.AppId = CylanceConfig.AppId;
                this.AppSecret = CylanceConfig.AppSecret;    
            }

            if (regionCode.Equals("apne1"))
                this.EndpointRegion = "https://protectapi-apne1.cylance.com";
            else if (regionCode.Equals("au"))
                this.EndpointRegion = "https://protectapi-au.cylance.com";
            else if (regionCode.Equals("euc1"))
                this.EndpointRegion = "https://protectapi-euc1.cylance.com";
            else if (regionCode.Equals(""))
                this.EndpointRegion = "https://protectapi.cylance.com";
            else if (regionCode.Equals("sae1"))
                this.EndpointRegion = "https://protectapi-sae1.cylance.com";
            else if (regionCode.Equals("us"))
                this.EndpointRegion = "https://protectapi.us.cylance.com";
            else
                throw new Exception("Invalid region code");
        }

        /// <summary>
        /// GetUser method will http get request a single Cylance users data.
        /// </summary>
        /// <param name="userIdentification">The user id or email address of the user</param>
        /// <returns >response Json as string, request json as string</returns>
        public (string responseJson, string requestJson) GetUser(string userIdentification) // userIdentification , user_id_or_email_address
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            var endpoint = this.EndpointRegion + "/users/v2/" + userIdentification;

            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);

            httpRequest.Accept = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";

            try
            {
                if (userIdentification.Equals(""))
                    throw new InvalidInputException();

                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + httpRequest.Headers.ToString();
                    return (result, request);
                }
            }
            catch (Exception ex)
            {
                return (ex.Message, httpRequest.RequestUri.ToString());
            }

        }
        /// <summary>
        /// GetUsers method will http get request all Cylance users data.
        /// </summary>
        /// <param name="pageNumber">The page number</param>
        /// <param name="pageSize">The item count on the page</param>
        /// <returns>response Json as string, request json as string, total page count from pagination as int</returns>
        public (string responseJson, string requestJson, int totalPage) GetUsers(int pageNumber = 1, int pageSize = 10)
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            var endpoint = this.EndpointRegion + $"/users/v2?page={pageNumber}&page_size={pageSize}";

            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);

            httpRequest.Accept = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";
            try
            {
                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();

                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + httpRequest.Headers.ToString();
                    Pagination pg = JsonConvert.DeserializeObject<Pagination>(result);
                    return (result, request, pg.totalPages);
                }
            }

            catch (Exception ex)
            {
                return (ex.Message, JsonConvert.SerializeObject(httpRequest, Formatting.Indented), 0);
            }

        }
        /// <summary>
        /// GetZones method will http get request all Cylance zones data.
        /// </summary>
        /// <param name="pageNumber">The page number</param>
        /// <param name="pageSize">The item count on the page</param>
        /// <returns>response Json as string, request json as string, total page count from pagination as int</returns>
        public (string responseJson, string requestJson, int totalPage) GetZones(int pageNumber = 1, int pageSize = 10)
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            var endpoint = this.EndpointRegion + $"/zones/v2?page={pageNumber}&page_size={pageSize}";

            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);
            httpRequest.Method = "GET";

            httpRequest.Accept = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";
            try
            {
                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();

                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + httpRequest.Headers.ToString();
                    Pagination pg = JsonConvert.DeserializeObject<Pagination>(result);
                    return (result, request, pg.totalPages);
                }
            }

            catch (Exception ex)
            {
                return (ex.Message, JsonConvert.SerializeObject(httpRequest, Formatting.Indented), 0);
            }

        }
        /// <summary>
        /// CreateUser method will http post request to create a new Cylance user.
        /// </summary>
        /// <param name="email">The email address of the user</param>
        /// <param name="userRole">The user role of the user, a specific guid string; User: 00000000-0000-0000-0000-000000000001, Administrator: 00000000-0000-0000-0000-000000000002, Read-Only: 00000000-0000-0000-0000-000000000003</param>
        /// <param name="firstName">The first name of the user</param>
        /// <param name="lastName">The last name of the user</param>
        /// <returns>response Json as string, request json as string</returns>
        /// <exception cref="InvalidInputException">Invalid input was entered</exception>
        public (string responseJson, string requestJson) CreateUser(string email, string userRole, string firstName, string lastName)
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            var endpoint = this.EndpointRegion + "/users/v2/";

            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);
            httpRequest.Method = "POST";

            httpRequest.Accept = "application/json";
            httpRequest.ContentType = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";

            var payload = @"{
                ""email"": """ + email + @""",
                ""user_role"": """ + userRole + @""",
                ""first_name"": """ + firstName + @""",
                ""last_name"": """ + lastName + @""",
                ""zones"": [
                ]
            }"; 
            
               
            
            try
            {
                if (email.Equals("") || userRole.Equals("") || firstName.Equals("") || lastName.Equals(""))
                    throw new InvalidInputException();

                using (var streamWriter = new StreamWriter(httpRequest.GetRequestStream()))
                {
                    streamWriter.Write(payload);
                    streamWriter.Flush();
                }

                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();

                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + $"Payload: {payload}\r\n" + httpRequest.Headers.ToString();
                    return (result, request);
                }

            }
            catch (Exception ex)
            {
                return (ex.Message, JsonConvert.SerializeObject(httpRequest, Formatting.Indented));
            }
        }
        /// <summary>
        /// CreateUser method will http post request to create a new Cylance user.
        /// </summary>
        /// <param name="email">The email address of the user</param>
        /// <param name="userRole">The user role of the user, a specific guid string; User: 00000000-0000-0000-0000-000000000001, Administrator: 00000000-0000-0000-0000-000000000002, Read-Only: 00000000-0000-0000-0000-000000000003</param>
        /// <param name="firstName">The first name of the user</param>
        /// <param name="lastName">The last name of the user</param>
        /// <param name="zoneId">The zone id of the user</param>
        /// <param name="zoneRole">The zone role of the user; Zone Manager: 00000000-0000-0000-0000-000000000001, User: 00000000-0000-0000-0000-000000000002</param>
        /// <returns>response Json as string, request json as string</returns>
        /// <exception cref="InvalidInputException">Invalid input was entered</exception>
        public (string responseJson, string requestJson) CreateUser(string email, string userRole, string firstName, string lastName, string zoneId,string zoneRole)
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            var endpoint = this.EndpointRegion + "/users/v2/";

            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);
            httpRequest.Method = "POST";

            httpRequest.Accept = "application/json";
            httpRequest.ContentType = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";

            var payload = @"{
                ""email"": """ + email + @""",
                ""user_role"": """ + userRole + @""",
                ""first_name"": """ + firstName + @""",
                ""last_name"": """ + lastName + @""",
                ""zones"": [
                    {
                    ""id"": """ + zoneId + @""", 
                    ""role_type"": """ + zoneRole + @"""
                    }
                ]
            }";
      
            try
            {
                if (email.Equals("") || userRole.Equals("") || firstName.Equals("") || lastName.Equals("") || zoneId.Equals("") || zoneRole.Equals(""))
                    throw new InvalidInputException();

                using (var streamWriter = new StreamWriter(httpRequest.GetRequestStream()))
                {
                    streamWriter.Write(payload);
                    streamWriter.Flush();
                }

                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();

                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + $"Payload: {payload}\r\n" + httpRequest.Headers.ToString();
                    return (result, request);
                }

            }
            catch (Exception ex)
            {
                return (ex.Message, JsonConvert.SerializeObject(httpRequest, Formatting.Indented));
            }
        }
        /// <summary>
        /// DeleteUser method is a wrapper method to delete a user from Cylance with the email address. 
        /// </summary>
        /// <param name="userIdentification">The user id or the email address of the user</param>
        /// <returns>response Json as string, request json as string</returns>
        public (string responseJson, string requestJson) DeleteUser(string userIdentification)
        {
            var userId = "";
            string responseJson = "";

            //this catches the email address to make a GET call for the user id.
            //DELETE can only use user id for API call so this wraps it, allowing email address to be accepted too
            if (userIdentification.Contains("@"))
            {
                (string userResponseJson, string userRequestJson) = GetUser(userIdentification);
                responseJson = userResponseJson;
                userId = JObject.Parse(userResponseJson)["id"].ToString();
            }
            else
            {
                userId = userIdentification;
            }
            
            return DeleteUserByUserId(userId);
        }
        /// <summary>
        /// DeleteUserByUserId method will http delete request to delete a new Cylance user with the user Id.
        /// </summary>
        /// <param name="userId">The user Id</param>
        /// <returns>response Json as string, request json as string</returns>
        private (string responseJson, string requestJson) DeleteUserByUserId(string userId)
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            //The endpoint is the same as GET User but it only accepts userId and reminder to set the request as delete
            var endpoint = this.EndpointRegion + "/users/v2/" + userId;

            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);
            httpRequest.Method = "DELETE";
            httpRequest.Accept = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";

            try
            {
                if (userId.Equals(""))
                    throw new InvalidInputException();

                // there is no response from deleting a user
                
                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    result = userId + " has been succesfully deleted.";
                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + httpRequest.Headers.ToString();
                    return (result, request);
                }
                
                
            }

            catch (Exception ex)
            {
                return (ex.Message, httpRequest.RequestUri.ToString());
            }

        }
        /// <summary>
        /// GetThreat method will http get request a single Cylance threat data.
        /// </summary>
        /// <param name="threatId">The Threat SHA256 Id</param>
        /// <returns>response Json as string, request json as string</returns>
        public (string responseJson, string requestJson) GetThreat(string threatId)
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            var endpoint = this.EndpointRegion + "/threats/v2/" + threatId;

            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);

            httpRequest.Accept = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";

            try
            {
                if (threatId.Equals(""))
                    throw new InvalidInputException();

                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + httpRequest.Headers.ToString();
                    return (result, request);
                }
            }

            catch (Exception ex)
            {
                return (ex.Message, httpRequest.RequestUri.ToString());
            }

        }
        /// <summary>
        /// GetthreatsLast24 method is a wrapper to get the last 24 hour of threats.
        /// </summary>
        /// <param name="pageNumber">The page number</param>
        /// <param name="pageSize">The number of items on the page</param>
        /// <returns>response Json as string, request json as string, total page count from pagination as int</returns>
        public (string responseJson, string requestJson, int totalPage) GetThreatsLast24(int pageNumber = 1, int pageSize = 10)
        {
            DateTime startTime = DateTime.Today.AddDays(-1);
            DateTime endTime = DateTime.Now;
            return GetThreats(pageNumber, pageSize, startTime, endTime);
        }
        /// <summary>
        /// GetThreats method will http get all threats.
        /// </summary>
        /// <param name="pageNumber">The page number</param>
        /// <param name="pageSize">The number of items on the page</param>
        /// <returns>response Json as string, request json as string, total page count from pagination as int</returns>
        public (string responseJson, string requestJson, int totalPage) GetThreats(int pageNumber = 1, int pageSize = 10)
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            var endpoint = this.EndpointRegion + $"/threats/v2?page={pageNumber}&page_size={pageSize}";


            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);

            httpRequest.Accept = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";
            try
            {
                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();

                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + httpRequest.Headers.ToString();
                    Pagination pg = JsonConvert.DeserializeObject<Pagination>(result);
                    return (result, request, pg.totalPages);
                }
            }

            catch (Exception ex)
            {
                return (ex.Message, JsonConvert.SerializeObject(httpRequest, Formatting.Indented), 0);
            }

        }
        /// <summary>
        /// GetThreats method will http get all threats within a time frame.
        /// </summary>
        /// <param name="pageNumber">The page number</param>
        /// <param name="pageSize">The number of items on the page</param>
        /// <param name="startTime">The time frame of the first threat</param>
        /// <param name="endTime">The time frame of the last threat</param>
        /// <returns>response Json as string, request json as string, total page count from pagination as int</returns>
        public (string responseJson, string requestJson, int totalPage) GetThreats(int pageNumber, int pageSize, DateTime startTime, DateTime endTime)
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            var startTimeFormated = startTime.ToString("s") + "Z";
            var endTimeFormated = endTime.ToString("s") + "Z";

            var endpoint = this.EndpointRegion + $"/threats/v2?page={pageNumber}&page_size={pageSize}&start_time={startTimeFormated}&end_time:{endTimeFormated}";


            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);

            httpRequest.Accept = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";
            try
            {
                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();

                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + httpRequest.Headers.ToString();
                    Pagination pg = JsonConvert.DeserializeObject<Pagination>(result);
                    return (result, request, pg.totalPages);
                }
            }

            catch (Exception ex)
            {
                return (ex.Message, JsonConvert.SerializeObject(httpRequest, Formatting.Indented), 0);
            }

        }
        /// <summary>
        /// GetInstaQuery method will http get request the specific instaquery with the query id.
        /// </summary>
        /// <param name="queryId">The id of the query</param>
        /// <returns>response Json as string, request json as string</returns>
        public (string responseJson, string requestJson) GetInstaQuery(string queryId)
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            var endpoint = this.EndpointRegion + "/instaqueries/v2/" + queryId;

            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);

            httpRequest.Accept = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";

            try
            {
                if (queryId.Equals(""))
                    throw new InvalidInputException();

                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + httpRequest.Headers.ToString();
                    return (result, request);
                }
            }

            catch (Exception ex)
            {
                return (ex.Message, httpRequest.RequestUri.ToString());
            }

        }
        /// <summary>
        /// GetInstaQueryResults method will http get request the specific instaquery results with the query id.
        /// </summary>
        /// <param name="queryId">The id of the query</param>
        /// <returns>response Json as string, request json as string</returns>
        public (string responseJson, string requestJson) GetInstaQueryResults(string queryId)
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            var endpoint = this.EndpointRegion + "/instaqueries/v2/" + queryId + "/results";

            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);

            httpRequest.Accept = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";

            try
            {
                if (queryId.Equals(""))
                    throw new InvalidInputException();

                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + httpRequest.Headers.ToString();
                    return (result, request);
                }
            }

            catch (Exception ex)
            {
                return (ex.Message, httpRequest.RequestUri.ToString());
            }

        }
        /// <summary>
        /// GetInstaQueries method will http get request all instaqueries.
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns>response Json as string, request json as string, total page count from pagination as int</returns>
        public (string responseJson, string requestJson, int totalPage) GetInstaQueries(int pageNumber = 1, int pageSize = 10)
        {
            var accessToken = GenerateAccessToken(this.TenantId, this.AppId);

            var endpoint = this.EndpointRegion + $"/instaqueries/v2?page={pageNumber}&page_size={pageSize}";

            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);

            httpRequest.Accept = "application/json";
            httpRequest.Headers["Authorization"] = $"Bearer {accessToken}";
            try
            {
                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();

                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + httpRequest.Headers.ToString();
                    Pagination pg = JsonConvert.DeserializeObject<Pagination>(result);
                    return (result, request, pg.totalPages);
                }
            }

            catch (Exception ex)
            {
                return (ex.Message, JsonConvert.SerializeObject(httpRequest, Formatting.Indented), 0);
            }

        }
        /// <summary>
        /// GenereateJWTClaims method generates the JwtClaims for Cylance authorization tokens.
        /// </summary>
        /// <param name="TenantId">The TenantId from Cylance config</param>
        /// <param name="AppId">The App id from Cylance Config</param>
        /// <returns>The JwtClaims</returns>
        private JwtClaims GenereateJWTClaims(string tenantId, string appId)
        {
            var utcNow = DateTime.UtcNow;
            var jwtClaims = new JwtClaims
            {
                jti = Guid.NewGuid().ToString(),
                iat = ((DateTimeOffset)utcNow).ToUnixTimeSeconds(),
                exp = ((DateTimeOffset)utcNow.AddSeconds(TIMEOUTSECS)).ToUnixTimeSeconds(),
                iss = "http://cylance.com",
                tid = tenantId,
                sub = appId
            };
            return jwtClaims;
        }
        /// <summary>
        /// GenerateAuthorizationToken method using the jwtClaims and app secret to generate the authorization token.
        /// </summary>
        /// <param name="jwtClaims">The jwtClaims nessesary for generating a Authorization token</param>
        /// <param name="AppSecret">The App Secrect from Cylance Config</param>
        /// <returns>The Authorization Token</returns>
        /// <exception cref="ArgumentNullException">jwtClaims is null</exception>
        /// <exception cref="ArgumentException">Invalid AppSecret</exception>
        private string GenerateAuthorizationToken(JwtClaims jwtClaims, string appSecret)
        {
            if (jwtClaims == null)
            {
                throw new ArgumentNullException(nameof(jwtClaims));
            }

            if (string.IsNullOrWhiteSpace(AppSecret))
            {
                throw new ArgumentException(nameof(appSecret));
            }

            var algorithm = new HMACSHA256Algorithm();
            var serializer = new JsonNetSerializer();
            var encoder = new JwtBase64UrlEncoder();
            var jwt = new JwtEncoder(algorithm, serializer, encoder);

            return jwt.Encode(jwtClaims, appSecret);
        }
        /// <summary>
        /// GenerateAccessToken method makes the http request for the access token.
        /// </summary>
        /// <param name="authToken">The authoization token</param>
        /// <returns>The Access Token</returns>
        /// <exception cref="ArgumentException">Invalid authoization token</exception>
        private string  GenerateAccessToken(string authToken)
        {
            if (string.IsNullOrWhiteSpace(authToken))
            {
                throw new ArgumentException(nameof(authToken));
            }

            var endpoint = this.EndpointRegion + "/auth/v2/token";
            var httpRequest = (HttpWebRequest)WebRequest.Create(endpoint);
            httpRequest.Method = "POST";

            httpRequest.Accept = "application/json";
            httpRequest.ContentType = "application/json";

            var payload = @"{
                ""auth_token"": """ + authToken +
                @""" }";
            
            try
            {
                using (var streamWriter = new StreamWriter(httpRequest.GetRequestStream()))
                {
                    streamWriter.Write(payload);
                    streamWriter.Flush();
                }

                var httpResponse = (HttpWebResponse)httpRequest.GetResponse();

                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    var request = $"URI: {httpRequest.RequestUri.ToString()} \r\n" + $"Payload: {payload}\r\n" + httpRequest.Headers.ToString();
                    AuthTokenResponse resultAuthToken = JsonConvert.DeserializeObject<AuthTokenResponse>(result);
                    return (resultAuthToken.AccessToken);
                }

            }
            catch (Exception ex)
            {
                return (ex.Message);
            }
        }

        /// <summary>
        /// GenerateAccessToken method makes the http request for the access token.
        /// </summary>
        /// <param name="authToken">The authoization token</param>
        /// <returns>The Access Token</returns>
        /// <exception cref="ArgumentException">Invalid authoization token</exception>
        private string GenerateAccessToken(string TenantId, string AppId)
        {
            var jwtClaims = GenereateJWTClaims(TenantId, AppId);
           
            var authToken = GenerateAuthorizationToken(jwtClaims, AppSecret);
            Console.WriteLine(authToken);
            var accessToken = GenerateAccessToken(authToken);
            //Console.WriteLine(accessToken);
            return accessToken;
        }
        
    }
    
    /// <summary>
    /// Custom Invalid input Exception class
    /// </summary>
    public class InvalidInputException : Exception
    {
        //Overriding the Message property
        public override string Message
        {
            get
            {
                return "Input empty or invalid.";
            }
        }
    }
    /// <summary>
    /// AuthToken request Json Properties
    /// </summary>
    internal sealed class AuthTokenRequest
    {
        [JsonProperty("auth_token")]
        public string AuthToken { get; set; }
    }
    /// <summary>
    /// AuthToken Response Json Properties
    /// </summary>
    internal sealed class AuthTokenResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
    }
    /// <summary>
    ///  Pagination Json Properties
    /// </summary>
    internal sealed class Pagination
    {

        [JsonProperty("page_number")]
        public int pageNumber { get; set; }

        [JsonProperty("page_size")]
        public int pageSize { get; set; }

        [JsonProperty("total_pages")]
        public int totalPages { get; set; }

        [JsonProperty("total_number_of_items")]
        public int totalNumberOfItems { get; set; }



    }
    /// <summary>
    /// JwtClaim Json Properties
    /// </summary>
    internal sealed class JwtClaims
    {
        public long exp { get; set; }
        public long iat { get; set; }
        public string iss { get; set; }
        public string sub { get; set; }
        public string jti { get; set; }
        public string tid { get; set; }
    }
    /// <summary>
    /// Cylance Congfig API key Json Properties
    /// </summary>
    public class CylanceConfig
    {
        [JsonProperty("tenantId")]
        public string TenantId { get; set; }

        [JsonProperty("appId")]
        public string AppId { get; set; }

        [JsonProperty("appSecret")]
        public string AppSecret { get; set; }
    }

}
