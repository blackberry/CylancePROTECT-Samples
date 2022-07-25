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
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using System.Threading;

namespace CylanceSampleWPFApp

{
    /// <summary>
    /// CylanceSampleWPFAppForm class is the to fuctionally connect the User Interface with the Cylance class to complete REST API requests
    /// </summary>
    public partial class CylanceSampleWPFAppForm : Form
    {
        SyslogServer syslogServer = null;

        //This class is state managed for the purposes of pagination
        private int pageNumber; // the current page number
        private int totalPages; // the current pagination total pages, no pagination: totalPages = 0
        private Action paginationTravesalFunction; // the currect action that requires pagination such that page traversals can be completed with increments of the current pageNumber with the action followed after.
        
        /// <summary>
        /// Initialize form
        /// </summary>
        public CylanceSampleWPFAppForm()
        {
            InitializeComponent();
            pageNumber = 0;
            totalPages = 0;
        }

        /// <summary>
        /// Button click to navigate pagination to previous(decrement) page
        /// </summary>
        private void buttonPreviousPage_Click(object sender, EventArgs e)
        {
            if (totalPages > 0)
            {
                pageNumber--;
                pageNumber = (pageNumber % totalPages) == 0 ? totalPages : (pageNumber % totalPages);
                paginationTravesalFunction();
            }
        }
        /// <summary>
        /// Button click to navigate pagination to next(increment) page
        /// </summary>
        private void buttonNextPage_Click(object sender, EventArgs e)
        {
            if (totalPages > 0)
            {
                pageNumber++;
                pageNumber = (pageNumber % totalPages) == 0 ? totalPages : (pageNumber % totalPages);
                paginationTravesalFunction();
            }

        }
        /// <summary>
        /// Beautify Json string with proper indentation
        /// </summary>
        private string BeautifyJson(string json)
        {
            try
            {
                JToken parsedJson = JToken.Parse(json);
                var beautified = parsedJson.ToString(Formatting.Indented);
                return beautified;
            }
            catch (Exception e)
            {
                return json;
            }
        }
        /// <summary>
        /// Toggle functionality of pagination navigation buttons
        /// </summary>
        private void TogglePaginationButton(bool buttonVisibility = false)
        {
            buttonNextPage.Visible = buttonVisibility;
            buttonPreviousPage.Visible = buttonVisibility;

            buttonNextPage.Enabled = buttonVisibility;
            buttonPreviousPage.Enabled = buttonVisibility;
        }
        /// <summary>
        /// Bring user panel to the front
        /// </summary>
        private void buttonUserPanel_Click(object sender, EventArgs e)
        {
            panelUser.BringToFront();
            panelApiIO.BringToFront();
        }
        /// <summary>
        /// Bring threat panel to the front
        /// </summary>
        private void buttonThreatPanel_Click(object sender, EventArgs e)
        {
            panelThreat.BringToFront();
            panelApiIO.BringToFront();
        }
        /// <summary>
        /// Bring instaquery panel to the front
        /// </summary>
        private void buttonInstaQuery_Click(object sender, EventArgs e)
        {
            panelInstaQuery.BringToFront();
            panelApiIO.BringToFront();
        }
        
        /// <summary>
        /// Button click to get a single user data
        /// </summary>
        private void buttonGetUser_Click(object sender, EventArgs e)
        {
            TogglePaginationButton(false);
            Cylance cylance = new Cylance();
            textBoxOutput.Clear();
            textBoxInput.Clear();

            pageNumber = 0;
            totalPages = 0;

            textBoxOutput.Clear();
            string email = Prompt.InputDialog("GetUser", "Enter Email Address or User ID");
            (string outputJson, string inputJson) = cylance.GetUser(email);
            textBoxInput.Text += inputJson;
            textBoxOutput.Text += BeautifyJson(outputJson);
        }
        /// <summary>
        /// Button click to call helper method to get multiple user data
        /// </summary>
        private void buttonGetMultiUsers_Click(object sender, EventArgs e)
        {
            pageNumber = 1;
            totalPages = 0;
            GetMultiUsers();

            paginationTravesalFunction = () => GetMultiUsers();
        }
        /// <summary>
        /// Helper method to get a multiple user data and toggle pagination
        /// </summary>
        private void GetMultiUsers()
        {
            TogglePaginationButton(true);
            Cylance cylance = new Cylance();
            textBoxOutput.Clear();
            textBoxInput.Clear();

            (string outputJson, string inputJson, int totalPages) = cylance.GetUsers(pageNumber);

            this.totalPages = totalPages;

            textBoxInput.Text += inputJson;
            textBoxOutput.Text += BeautifyJson(outputJson);
        }
        /// <summary>
        /// Button click to create user with multiple input prompts
        /// </summary>
        private void buttonCreateUser_Click(object sender, EventArgs e)
        {
            TogglePaginationButton(false);
            Cylance cylance = new Cylance();
            textBoxOutput.Clear();
            textBoxInput.Clear();

            pageNumber = 0;
            totalPages = 0;

            string email = Prompt.InputDialog("CreateUser", "Enter Email Address");

            //The unique identifier defining the user's role in the Console.
            IDictionary<string, string> roleDictionary = new Dictionary<string, string>();

            roleDictionary.Add("User", "00000000-0000-0000-0000-000000000001");

            roleDictionary.Add("Administrator", "00000000-0000-0000-0000-000000000002");

            roleDictionary.Add("Read-Only", "00000000-0000-0000-0000-000000000003");

            string role = Prompt.InputDropDownDialog("CreateUser", "Select User Role", roleDictionary.Keys.ToArray());
            string userRole = "";
            if (!role.Equals(""))
            {
                userRole = roleDictionary[role];
            }

            string firstName = Prompt.InputDialog("CreateUser", "Enter First Name");
            string lastName = Prompt.InputDialog("CreateUser", "Enter Last Name");

            //The unique identifier defining the zone in the Console.
            int pageNum = 1;
            int totalPage = 0;
            int pageSize = 1;// if the pagesize is increased, it will require iterating the array
            IDictionary<string, string> zoneDictionary = new Dictionary<string, string>();

            zoneDictionary.Add("No zone", string.Empty); // select no zone option

            //add the zones into selection from the GET zone API.
            do
            {
                (string outputJsonZone, string inputJsonZone, int totalPageCount) = cylance.GetZones(pageNum, pageSize);
                var name = JObject.Parse(outputJsonZone)["page_items"][0]["name"].ToString();
                var id = JObject.Parse(outputJsonZone)["page_items"][0]["id"].ToString();
                zoneDictionary.Add(name, id);

                totalPage = totalPageCount;
                pageNum++;

            } while (pageNum <= totalPage);


            string zone = Prompt.InputDropDownDialog("CreateUser", "Select Zone", zoneDictionary.Keys.ToArray());
            string zoneId = "";
            if (!zone.Equals(""))
            {
                zoneId = zoneDictionary[zone];
            }

            if (zoneId.Equals(string.Empty))
            {

                (string outputJson, string inputJson) = cylance.CreateUser(email, userRole, firstName, lastName);
                textBoxInput.Text += inputJson;
                textBoxOutput.Text += BeautifyJson(outputJson);
            }
            else
            {
                IDictionary<string, string> zoneRoleDictionary = new Dictionary<string, string>();

                zoneRoleDictionary.Add("Zone Manager", "00000000-0000-0000-0000-000000000001");
                
                zoneRoleDictionary.Add("User", "00000000-0000-0000-0000-000000000002");

                string zoneRole = Prompt.InputDropDownDialog("CreateUser", "Select User Role", zoneRoleDictionary.Keys.ToArray());
                string zoneUserRole = "";
                if (!zoneRole.Equals(""))
                {
                    zoneUserRole = roleDictionary[role];
                }

                (string outputJsonUser, string inputJsonUser) = cylance.CreateUser(email, userRole, firstName, lastName, zoneId, zoneUserRole);
                textBoxInput.Text += inputJsonUser;
                textBoxOutput.Text += BeautifyJson(outputJsonUser);
            }

        }
        /// <summary>
        /// Button click to delete user
        /// </summary>
        private void buttonDeleteUser_Click(object sender, EventArgs e)
        {
            TogglePaginationButton(false);
            Cylance cylance = new Cylance();
            textBoxOutput.Clear();
            textBoxInput.Clear();

            pageNumber = 0;
            totalPages = 0;

            string email = Prompt.InputDialog("DeleteUser", "Enter Email Address or User Id");
            (string outputJson, string inputJson) = cylance.DeleteUser(email);
            textBoxInput.Text += inputJson;
            textBoxOutput.Text += outputJson; // do not beautiy because Cylance delete has no response
        }
        /// <summary>
        /// Button click to get a single threat with threat SHA256 id
        /// </summary>
        private void buttonGetThreat_Click(object sender, EventArgs e)
        {
            TogglePaginationButton(false);
            Cylance cylance = new Cylance();
            textBoxOutput.Clear();
            textBoxInput.Clear();

            pageNumber = 0;
            totalPages = 0;

            textBoxOutput.Clear();
            string threatSHA256 = Prompt.InputDialog("GetThreat", "Enter threat sha256");
            (string outputJson, string inputJson) = cylance.GetThreat(threatSHA256);
            textBoxInput.Text += inputJson;
            textBoxOutput.Text += BeautifyJson(outputJson);
        }
        /// <summary>
        /// Button click to call helper method to get all threats in last 24 hours
        /// </summary>
        private void buttonGetThreatsLast24_Click(object sender, EventArgs e)
        {
            pageNumber = 1;
            totalPages = 0;
            GetThreatsLast24();

            paginationTravesalFunction = () => GetThreatsLast24();

        }
        /// <summary>
        /// Helper method to get multiple threat data in last 24 hour and toggle pagination
        /// </summary>
        private void GetThreatsLast24()
        {
            TogglePaginationButton(true);
            Cylance cylance = new Cylance();
            textBoxOutput.Clear();
            textBoxInput.Clear();

            (string outputJson, string inputJson, int totalPages) = cylance.GetThreatsLast24(pageNumber);

            this.totalPages = totalPages;

            textBoxInput.Text += inputJson;
            textBoxOutput.Text += BeautifyJson(outputJson);
        }
        /// <summary>
        /// Button click to call helper method to get all threats 
        /// </summary>
        private void buttonGetMultiThreats_Click(object sender, EventArgs e)
        {
            pageNumber = 1;
            totalPages = 0;
            GetMultiThreats();

            paginationTravesalFunction = () => GetMultiThreats();

        }
        /// <summary>
        /// Helper method to get multiple threat data and toggle pagination
        /// </summary>
        private void GetMultiThreats()
        {
            TogglePaginationButton(true);
            Cylance cylance = new Cylance();
            textBoxOutput.Clear();
            textBoxInput.Clear();

            (string outputJson, string inputJson, int totalPages) = cylance.GetThreats(pageNumber);

            this.totalPages = totalPages;

            textBoxInput.Text += inputJson;
            textBoxOutput.Text += BeautifyJson(outputJson);
        }
        /// <summary>
        /// Button click to get a single instaquery data with query id
        /// </summary>
        private void buttonGetInstaQuery_Click(object sender, EventArgs e)
        {
            TogglePaginationButton(false);
            Cylance cylance = new Cylance();
            textBoxOutput.Clear();
            textBoxInput.Clear();

            pageNumber = 0;
            totalPages = 0;

            string queryID = Prompt.InputDialog("GetInstaQuery", "Enter InstaQuery ID");
            (string outputJson, string inputJson) = cylance.GetInstaQuery(queryID);
            textBoxInput.Text += inputJson;
            textBoxOutput.Text += BeautifyJson(outputJson);
        }
        /// <summary>
        /// Button click to call helper method to get all instaquery data 
        /// </summary>
        private void buttonMultipleInstaQuery_Click(object sender, EventArgs e)
        {
            pageNumber = 1;
            totalPages = 0;
            GetMultiInstaQueries();

            paginationTravesalFunction = () => GetMultiInstaQueries();

        }
        /// <summary>
        /// Helper method to get multiple instaquery data and toggle pagination
        /// </summary>
        private void GetMultiInstaQueries()
        {
            TogglePaginationButton(true);
            Cylance cylance = new Cylance();
            textBoxOutput.Clear();
            textBoxInput.Clear();

            pageNumber = 1;

            (string outputJson, string inputJson, int totalPages) = cylance.GetInstaQueries(pageNumber);

            this.totalPages = totalPages;

            textBoxInput.Text += inputJson;
            textBoxOutput.Text += BeautifyJson(outputJson);
        }
        /// <summary>
        /// Button click to get a instaquery result data with query id
        /// </summary>
        private void buttonGetInstaQueryResults_Click(object sender, EventArgs e)
        {
            TogglePaginationButton(false);
            Cylance cylance = new Cylance();
            textBoxOutput.Clear();
            textBoxInput.Clear();

            pageNumber = 0;
            totalPages = 0;

            string queryID = Prompt.InputDialog("GetInstaQueryResults", "Enter InstaQuery ID");
            (string outputJson, string inputJson) = cylance.GetInstaQueryResults(queryID);
            textBoxInput.Text += inputJson;
            textBoxOutput.Text += BeautifyJson(outputJson);
        }

        /// <summary>
        /// handle all syslog related functions
        /// </summary>
        #region syslog
        private delegate void SafeCallDelegate(string text);
        private Thread threadSyslog = null;

        /// <summary>
        /// Bring syslog panel to the front
        /// </summary>
        private void buttonSyslogPanel_Click(object sender, EventArgs e)
        {
            panelSyslog.BringToFront();
            panelSyslogIO.BringToFront();
            TogglePaginationButton(false);
            textBoxOutput.Clear();
            textBoxInput.Clear();
        }
        /// <summary>
        /// Stop syslog output on the form
        /// </summary>
        private void buttonSyslogStop_Click(object sender, EventArgs e)  
        {
           //stop syslog
            syslogServer.terminate();

            //stop thread
            threadSyslog.Join();

            //Console.WriteLine("ThreadState: {0}",threadSyslog.ThreadState); //used to check state of thread

        }
        /// <summary>
        /// Start syslogserver as new thread and begin output
        /// </summary>
        private void buttonSyslogStart_Click(object sender, EventArgs e)
        {
            //127.0.0.1
            //20514

            Action<string> action =  safeSyslogWriteLine;

            //create syslogServer
            syslogServer = new SyslogServer(textBoxHost.Text, textBoxPort.Text, action);
            
            //create thread to run syslogServer
            threadSyslog = new Thread(new ThreadStart(syslogServer.run));
            threadSyslog.Start();

            //Console.WriteLine("ThreadState: {0}",threadSyslog.ThreadState); //used to check state of thread
        }

        /// <summary>
        /// helper funtion to write to the form textbox in a thread safely
        /// </summary>
        /// <param name="text">The string to be written</param>
        public void safeSyslogWriteLine(string text)
        {
            //safeSyslogWriteLine is nessesary because multithreading may cause the textbox to require invoke
            //https://docs.microsoft.com/en-us/dotnet/desktop/winforms/controls/how-to-make-thread-safe-calls?view=netdesktop-6.0

            if (textBoxOutput.InvokeRequired)
            {
                var d = new SafeCallDelegate(safeSyslogWriteLine);
                textBoxSyslogOutput.Invoke(d, new object[] { text + Environment.NewLine });
            }
            else
            {
                //Console.WriteLine(text + Environment.NewLine);
                textBoxSyslogOutput.Text += text + Environment.NewLine;
            }
        }

        #endregion

    }



    public static class Prompt
    {
        public static string InputDialog( string caption, string text)
        {
            Form prompt = new Form()
            {
                ControlBox = true,
                Width = 500,
                Height = 150,
                FormBorderStyle = FormBorderStyle.FixedDialog,
                Text = caption,
                StartPosition = FormStartPosition.CenterScreen
            };
            Label textLabel = new Label() { Left = 50, Top = 20, Width = 400, Text = text };
            TextBox textBox = new TextBox() { Left = 50, Top = 50, Width = 400 };
            Button confirmation = new Button() { Text = "Ok", Left = 350, Width = 100, Top = 70, DialogResult = DialogResult.OK };
            confirmation.Click += (sender, e) => { prompt.Close(); };
            prompt.Controls.Add(textBox);
            prompt.Controls.Add(confirmation);
            prompt.Controls.Add(textLabel);
            prompt.AcceptButton = confirmation;

            return prompt.ShowDialog() == DialogResult.OK ? textBox.Text : "";
        }

        public static string InputDropDownDialog(string caption, string text, string[] dropDownOptions)
        {
            Form prompt = new Form()
            {
                ControlBox = true,
                Width = 500,
                Height = 150,
                FormBorderStyle = FormBorderStyle.FixedDialog,
                Text = caption,
                StartPosition = FormStartPosition.CenterScreen
            };
            Label textLabel = new Label() { Left = 50, Top = 20, Width = 400, Text = text };
            ComboBox comboBox = new ComboBox() { Left = 50, Top = 50, Width = 400 };
            comboBox.DropDownStyle = ComboBoxStyle.DropDown;
            comboBox.Items.AddRange(dropDownOptions);
            comboBox.Text = dropDownOptions[0];
            Button confirmation = new Button() { Text = "Ok", Left = 350, Width = 100, Top = 70, DialogResult = DialogResult.OK };
            confirmation.Click += (sender, e) => { prompt.Close(); };
            prompt.Controls.Add(comboBox);
            prompt.Controls.Add(confirmation);
            prompt.Controls.Add(textLabel);
            prompt.AcceptButton = confirmation;

            return prompt.ShowDialog() == DialogResult.OK ? comboBox.Text : "";
        }
    }
}
