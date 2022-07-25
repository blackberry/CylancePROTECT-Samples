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
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace CylanceSampleWPFApp
{
    public class SyslogServer
    {
        bool isAlive;
        IPAddress hostname;
        Int32 portnum;
        TcpListener listen;
        Action<string> writeText;

        /// <summary>
        /// Consturctor
        /// </summary>
        /// <param name="host">the host</param>
        /// <param name="port">the port</param>
        /// <param name="writeText">the action to write text</param>
        public SyslogServer(IPAddress hostname, Int32 portnum, Action<string> writeText)
        {
            this.isAlive = true;
            this.hostname = hostname;
            this.portnum = portnum;
            this.writeText = writeText;
            this.listen = new TcpListener(this.hostname, this.portnum);
        }
        /// <summary>
        /// Consturctor
        /// </summary>
        /// <param name="host">the host string</param>
        /// <param name="port">the port string</param>
        /// <param name="writeText">the action to write text</param>
        public SyslogServer(string host, string port, Action<string> writeText)
        {
            this.isAlive = true;
            (this.hostname, this.portnum) = parseHostPort(host, port);
            this.writeText = writeText;
            this.listen = new TcpListener(this.hostname, this.portnum);
        }
        /// <summary>
        /// run the syslog server
        /// </summary>
        public void run()
        {
            try
            {
                this.listen.Start();
                this.writeText(hostname.ToString()+":"+portnum.ToString()+" is accepting Syslog stream");
                while (true)
                {
                    using (var client = this.listen.AcceptTcpClient())
                    using (var netStream = client.GetStream())
                    {
                        // Read server response
                        byte[] recvData = new byte[client.ReceiveBufferSize];
                        int bytes = netStream.Read(recvData, 0, recvData.Length); //save the length of the stream, without this, the encoding may return additional characters
                        string message = Encoding.UTF8.GetString(recvData, 0, bytes);
                        this.writeText(message);
                    };
                    if (!this.isAlive)
                    {

                        //this.writeText("Termination of Syslog stream succesful!");
                        this.listen.Stop();
                        return;
                    }
                }
            }
            catch (Exception e)
            {
                //cannot have write text in here. it will halt the UI thread
                return;

            }
        }
        /// <summary>
        /// Helper function to terminate the syslog server
        /// </summary>
        public void terminate()
        {
            this.writeText("Termination of Syslog stream succesful!");
            this.listen.Stop();
            this.isAlive = false;
        }
        /// <summary>
        /// The helper function that will try to parse the host and port
        /// </summary>
        public static (IPAddress hostname, Int32 portnum) parseHostPort(string host, string port)
        {
            IPAddress hostname = IPAddress.None;
            Int32 portnum = 54000;
            try
            {

                IPAddress.TryParse(host, out hostname);

                Int32.TryParse(port, out portnum);

            }
            catch (Exception e) { 
                //Console.WriteLine(e.Message); 
            }

            return (hostname, portnum);
        }
    }
}
