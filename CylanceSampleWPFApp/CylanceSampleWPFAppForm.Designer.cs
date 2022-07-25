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
namespace CylanceSampleWPFApp
{
    partial class CylanceSampleWPFAppForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CylanceSampleWPFAppForm));
            this.textBoxOutput = new System.Windows.Forms.TextBox();
            this.buttonPreviousPage = new System.Windows.Forms.Button();
            this.buttonNextPage = new System.Windows.Forms.Button();
            this.textBoxInput = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.panelUser = new System.Windows.Forms.Panel();
            this.buttonDeleteUser = new System.Windows.Forms.Button();
            this.buttonGetMultiUsers = new System.Windows.Forms.Button();
            this.buttonCreateUser = new System.Windows.Forms.Button();
            this.buttonGetUser = new System.Windows.Forms.Button();
            this.buttonUserPanel = new System.Windows.Forms.Button();
            this.buttonThreatPanel = new System.Windows.Forms.Button();
            this.panelThreat = new System.Windows.Forms.Panel();
            this.buttonGetMultiThreats = new System.Windows.Forms.Button();
            this.buttonGetThreatsLast24 = new System.Windows.Forms.Button();
            this.buttonGetThreat = new System.Windows.Forms.Button();
            this.buttonInstaQuery = new System.Windows.Forms.Button();
            this.panelInstaQuery = new System.Windows.Forms.Panel();
            this.buttonMultipleInstaQuery = new System.Windows.Forms.Button();
            this.buttonGetInstaQueryResults = new System.Windows.Forms.Button();
            this.buttonGetInstaQuery = new System.Windows.Forms.Button();
            this.buttonSyslogStart = new System.Windows.Forms.Button();
            this.buttonSyslogStop = new System.Windows.Forms.Button();
            this.buttonSyslogPanel = new System.Windows.Forms.Button();
            this.panelApiIO = new System.Windows.Forms.Panel();
            this.panelSyslogIO = new System.Windows.Forms.Panel();
            this.textBoxSyslogOutput = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.panelSyslog = new System.Windows.Forms.Panel();
            this.textBoxPort = new System.Windows.Forms.TextBox();
            this.textBoxHost = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.panelUser.SuspendLayout();
            this.panelThreat.SuspendLayout();
            this.panelInstaQuery.SuspendLayout();
            this.panelApiIO.SuspendLayout();
            this.panelSyslogIO.SuspendLayout();
            this.panelSyslog.SuspendLayout();
            this.SuspendLayout();
            // 
            // textBoxOutput
            // 
            this.textBoxOutput.Location = new System.Drawing.Point(10, 232);
            this.textBoxOutput.Margin = new System.Windows.Forms.Padding(2);
            this.textBoxOutput.Multiline = true;
            this.textBoxOutput.Name = "textBoxOutput";
            this.textBoxOutput.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.textBoxOutput.Size = new System.Drawing.Size(668, 413);
            this.textBoxOutput.TabIndex = 1;
            // 
            // buttonPreviousPage
            // 
            this.buttonPreviousPage.Font = new System.Drawing.Font("Microsoft Sans Serif", 40F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.buttonPreviousPage.Location = new System.Drawing.Point(730, 539);
            this.buttonPreviousPage.Margin = new System.Windows.Forms.Padding(2);
            this.buttonPreviousPage.Name = "buttonPreviousPage";
            this.buttonPreviousPage.Size = new System.Drawing.Size(75, 75);
            this.buttonPreviousPage.TabIndex = 3;
            this.buttonPreviousPage.Text = "<";
            this.buttonPreviousPage.UseVisualStyleBackColor = true;
            this.buttonPreviousPage.Visible = false;
            this.buttonPreviousPage.Click += new System.EventHandler(this.buttonPreviousPage_Click);
            // 
            // buttonNextPage
            // 
            this.buttonNextPage.Font = new System.Drawing.Font("Microsoft Sans Serif", 40F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.buttonNextPage.Location = new System.Drawing.Point(850, 539);
            this.buttonNextPage.Margin = new System.Windows.Forms.Padding(2);
            this.buttonNextPage.Name = "buttonNextPage";
            this.buttonNextPage.Size = new System.Drawing.Size(75, 75);
            this.buttonNextPage.TabIndex = 4;
            this.buttonNextPage.Text = ">";
            this.buttonNextPage.UseVisualStyleBackColor = true;
            this.buttonNextPage.Visible = false;
            this.buttonNextPage.Click += new System.EventHandler(this.buttonNextPage_Click);
            // 
            // textBoxInput
            // 
            this.textBoxInput.Location = new System.Drawing.Point(10, 22);
            this.textBoxInput.Margin = new System.Windows.Forms.Padding(2);
            this.textBoxInput.Multiline = true;
            this.textBoxInput.Name = "textBoxInput";
            this.textBoxInput.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.textBoxInput.Size = new System.Drawing.Size(668, 187);
            this.textBoxInput.TabIndex = 5;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(8, 211);
            this.label1.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(55, 13);
            this.label1.TabIndex = 7;
            this.label1.Text = "Response";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(10, 7);
            this.label2.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(87, 13);
            this.label2.TabIndex = 8;
            this.label2.Text = "Request Content";
            // 
            // panelUser
            // 
            this.panelUser.Controls.Add(this.buttonDeleteUser);
            this.panelUser.Controls.Add(this.buttonGetMultiUsers);
            this.panelUser.Controls.Add(this.buttonCreateUser);
            this.panelUser.Controls.Add(this.buttonGetUser);
            this.panelUser.Location = new System.Drawing.Point(716, 35);
            this.panelUser.Margin = new System.Windows.Forms.Padding(2);
            this.panelUser.Name = "panelUser";
            this.panelUser.Size = new System.Drawing.Size(229, 477);
            this.panelUser.TabIndex = 10;
            // 
            // buttonDeleteUser
            // 
            this.buttonDeleteUser.Location = new System.Drawing.Point(14, 252);
            this.buttonDeleteUser.Margin = new System.Windows.Forms.Padding(2);
            this.buttonDeleteUser.Name = "buttonDeleteUser";
            this.buttonDeleteUser.Size = new System.Drawing.Size(196, 75);
            this.buttonDeleteUser.TabIndex = 13;
            this.buttonDeleteUser.Text = "Delete User";
            this.buttonDeleteUser.UseVisualStyleBackColor = true;
            this.buttonDeleteUser.Click += new System.EventHandler(this.buttonDeleteUser_Click);
            // 
            // buttonGetMultiUsers
            // 
            this.buttonGetMultiUsers.Location = new System.Drawing.Point(14, 97);
            this.buttonGetMultiUsers.Margin = new System.Windows.Forms.Padding(2);
            this.buttonGetMultiUsers.Name = "buttonGetMultiUsers";
            this.buttonGetMultiUsers.Size = new System.Drawing.Size(196, 71);
            this.buttonGetMultiUsers.TabIndex = 12;
            this.buttonGetMultiUsers.Text = "Get All Users";
            this.buttonGetMultiUsers.UseVisualStyleBackColor = true;
            this.buttonGetMultiUsers.Click += new System.EventHandler(this.buttonGetMultiUsers_Click);
            // 
            // buttonCreateUser
            // 
            this.buttonCreateUser.Location = new System.Drawing.Point(14, 172);
            this.buttonCreateUser.Margin = new System.Windows.Forms.Padding(2);
            this.buttonCreateUser.Name = "buttonCreateUser";
            this.buttonCreateUser.Size = new System.Drawing.Size(196, 75);
            this.buttonCreateUser.TabIndex = 11;
            this.buttonCreateUser.Text = "Create User";
            this.buttonCreateUser.UseVisualStyleBackColor = true;
            this.buttonCreateUser.Click += new System.EventHandler(this.buttonCreateUser_Click);
            // 
            // buttonGetUser
            // 
            this.buttonGetUser.Location = new System.Drawing.Point(14, 21);
            this.buttonGetUser.Margin = new System.Windows.Forms.Padding(2);
            this.buttonGetUser.Name = "buttonGetUser";
            this.buttonGetUser.Size = new System.Drawing.Size(196, 71);
            this.buttonGetUser.TabIndex = 10;
            this.buttonGetUser.Text = "Get User";
            this.buttonGetUser.UseVisualStyleBackColor = true;
            this.buttonGetUser.Click += new System.EventHandler(this.buttonGetUser_Click);
            // 
            // buttonUserPanel
            // 
            this.buttonUserPanel.Location = new System.Drawing.Point(692, 1);
            this.buttonUserPanel.Margin = new System.Windows.Forms.Padding(2);
            this.buttonUserPanel.Name = "buttonUserPanel";
            this.buttonUserPanel.Size = new System.Drawing.Size(67, 24);
            this.buttonUserPanel.TabIndex = 14;
            this.buttonUserPanel.Text = "User";
            this.buttonUserPanel.UseVisualStyleBackColor = true;
            this.buttonUserPanel.Click += new System.EventHandler(this.buttonUserPanel_Click);
            // 
            // buttonThreatPanel
            // 
            this.buttonThreatPanel.Location = new System.Drawing.Point(763, 1);
            this.buttonThreatPanel.Margin = new System.Windows.Forms.Padding(2);
            this.buttonThreatPanel.Name = "buttonThreatPanel";
            this.buttonThreatPanel.Size = new System.Drawing.Size(67, 24);
            this.buttonThreatPanel.TabIndex = 16;
            this.buttonThreatPanel.Text = "Threat";
            this.buttonThreatPanel.UseVisualStyleBackColor = true;
            this.buttonThreatPanel.Click += new System.EventHandler(this.buttonThreatPanel_Click);
            // 
            // panelThreat
            // 
            this.panelThreat.Controls.Add(this.buttonGetMultiThreats);
            this.panelThreat.Controls.Add(this.buttonGetThreatsLast24);
            this.panelThreat.Controls.Add(this.buttonGetThreat);
            this.panelThreat.Location = new System.Drawing.Point(716, 35);
            this.panelThreat.Margin = new System.Windows.Forms.Padding(2);
            this.panelThreat.Name = "panelThreat";
            this.panelThreat.Size = new System.Drawing.Size(229, 477);
            this.panelThreat.TabIndex = 15;
            // 
            // buttonGetMultiThreats
            // 
            this.buttonGetMultiThreats.Location = new System.Drawing.Point(14, 172);
            this.buttonGetMultiThreats.Margin = new System.Windows.Forms.Padding(2);
            this.buttonGetMultiThreats.Name = "buttonGetMultiThreats";
            this.buttonGetMultiThreats.Size = new System.Drawing.Size(196, 71);
            this.buttonGetMultiThreats.TabIndex = 13;
            this.buttonGetMultiThreats.Text = "Get All Threats";
            this.buttonGetMultiThreats.UseVisualStyleBackColor = true;
            this.buttonGetMultiThreats.Click += new System.EventHandler(this.buttonGetMultiThreats_Click);
            // 
            // buttonGetThreatsLast24
            // 
            this.buttonGetThreatsLast24.Location = new System.Drawing.Point(14, 97);
            this.buttonGetThreatsLast24.Margin = new System.Windows.Forms.Padding(2);
            this.buttonGetThreatsLast24.Name = "buttonGetThreatsLast24";
            this.buttonGetThreatsLast24.Size = new System.Drawing.Size(196, 71);
            this.buttonGetThreatsLast24.TabIndex = 12;
            this.buttonGetThreatsLast24.Text = "Get Threats Last 24 hr";
            this.buttonGetThreatsLast24.UseVisualStyleBackColor = true;
            this.buttonGetThreatsLast24.Click += new System.EventHandler(this.buttonGetThreatsLast24_Click);
            // 
            // buttonGetThreat
            // 
            this.buttonGetThreat.Location = new System.Drawing.Point(14, 21);
            this.buttonGetThreat.Margin = new System.Windows.Forms.Padding(2);
            this.buttonGetThreat.Name = "buttonGetThreat";
            this.buttonGetThreat.Size = new System.Drawing.Size(196, 71);
            this.buttonGetThreat.TabIndex = 10;
            this.buttonGetThreat.Text = "Get Threat";
            this.buttonGetThreat.UseVisualStyleBackColor = true;
            this.buttonGetThreat.Click += new System.EventHandler(this.buttonGetThreat_Click);
            // 
            // buttonInstaQuery
            // 
            this.buttonInstaQuery.CausesValidation = false;
            this.buttonInstaQuery.Location = new System.Drawing.Point(834, 1);
            this.buttonInstaQuery.Margin = new System.Windows.Forms.Padding(2);
            this.buttonInstaQuery.Name = "buttonInstaQuery";
            this.buttonInstaQuery.Size = new System.Drawing.Size(67, 24);
            this.buttonInstaQuery.TabIndex = 18;
            this.buttonInstaQuery.Text = "InstaQuery";
            this.buttonInstaQuery.UseVisualStyleBackColor = true;
            this.buttonInstaQuery.Click += new System.EventHandler(this.buttonInstaQuery_Click);
            // 
            // panelInstaQuery
            // 
            this.panelInstaQuery.Controls.Add(this.buttonMultipleInstaQuery);
            this.panelInstaQuery.Controls.Add(this.buttonGetInstaQueryResults);
            this.panelInstaQuery.Controls.Add(this.buttonGetInstaQuery);
            this.panelInstaQuery.Location = new System.Drawing.Point(716, 35);
            this.panelInstaQuery.Margin = new System.Windows.Forms.Padding(2);
            this.panelInstaQuery.Name = "panelInstaQuery";
            this.panelInstaQuery.Size = new System.Drawing.Size(229, 477);
            this.panelInstaQuery.TabIndex = 17;
            // 
            // buttonMultipleInstaQuery
            // 
            this.buttonMultipleInstaQuery.Location = new System.Drawing.Point(14, 97);
            this.buttonMultipleInstaQuery.Margin = new System.Windows.Forms.Padding(2);
            this.buttonMultipleInstaQuery.Name = "buttonMultipleInstaQuery";
            this.buttonMultipleInstaQuery.Size = new System.Drawing.Size(196, 71);
            this.buttonMultipleInstaQuery.TabIndex = 12;
            this.buttonMultipleInstaQuery.Text = "Get Multiple InstaQuery";
            this.buttonMultipleInstaQuery.UseVisualStyleBackColor = true;
            this.buttonMultipleInstaQuery.Click += new System.EventHandler(this.buttonMultipleInstaQuery_Click);
            // 
            // buttonGetInstaQueryResults
            // 
            this.buttonGetInstaQueryResults.Location = new System.Drawing.Point(14, 172);
            this.buttonGetInstaQueryResults.Margin = new System.Windows.Forms.Padding(2);
            this.buttonGetInstaQueryResults.Name = "buttonGetInstaQueryResults";
            this.buttonGetInstaQueryResults.Size = new System.Drawing.Size(196, 75);
            this.buttonGetInstaQueryResults.TabIndex = 11;
            this.buttonGetInstaQueryResults.Text = "Get InstaQuery Results";
            this.buttonGetInstaQueryResults.UseVisualStyleBackColor = true;
            this.buttonGetInstaQueryResults.Click += new System.EventHandler(this.buttonGetInstaQueryResults_Click);
            // 
            // buttonGetInstaQuery
            // 
            this.buttonGetInstaQuery.Location = new System.Drawing.Point(14, 21);
            this.buttonGetInstaQuery.Margin = new System.Windows.Forms.Padding(2);
            this.buttonGetInstaQuery.Name = "buttonGetInstaQuery";
            this.buttonGetInstaQuery.Size = new System.Drawing.Size(196, 71);
            this.buttonGetInstaQuery.TabIndex = 10;
            this.buttonGetInstaQuery.Text = "Get InstaQuery";
            this.buttonGetInstaQuery.UseVisualStyleBackColor = true;
            this.buttonGetInstaQuery.Click += new System.EventHandler(this.buttonGetInstaQuery_Click);
            // 
            // buttonSyslogStart
            // 
            this.buttonSyslogStart.BackColor = System.Drawing.Color.Lime;
            this.buttonSyslogStart.Location = new System.Drawing.Point(12, 85);
            this.buttonSyslogStart.Name = "buttonSyslogStart";
            this.buttonSyslogStart.Size = new System.Drawing.Size(196, 71);
            this.buttonSyslogStart.TabIndex = 19;
            this.buttonSyslogStart.Text = "Enable Syslog Stream";
            this.buttonSyslogStart.UseVisualStyleBackColor = false;
            this.buttonSyslogStart.Click += new System.EventHandler(this.buttonSyslogStart_Click);
            // 
            // buttonSyslogStop
            // 
            this.buttonSyslogStop.BackColor = System.Drawing.Color.Red;
            this.buttonSyslogStop.Location = new System.Drawing.Point(13, 162);
            this.buttonSyslogStop.Name = "buttonSyslogStop";
            this.buttonSyslogStop.Size = new System.Drawing.Size(195, 71);
            this.buttonSyslogStop.TabIndex = 20;
            this.buttonSyslogStop.Text = "Stop Syslog Stream";
            this.buttonSyslogStop.UseVisualStyleBackColor = false;
            this.buttonSyslogStop.Click += new System.EventHandler(this.buttonSyslogStop_Click);
            // 
            // buttonSyslogPanel
            // 
            this.buttonSyslogPanel.Location = new System.Drawing.Point(905, 1);
            this.buttonSyslogPanel.Margin = new System.Windows.Forms.Padding(2);
            this.buttonSyslogPanel.Name = "buttonSyslogPanel";
            this.buttonSyslogPanel.Size = new System.Drawing.Size(75, 24);
            this.buttonSyslogPanel.TabIndex = 21;
            this.buttonSyslogPanel.Text = "Syslog";
            this.buttonSyslogPanel.UseVisualStyleBackColor = true;
            this.buttonSyslogPanel.Click += new System.EventHandler(this.buttonSyslogPanel_Click);
            // 
            // panelApiIO
            // 
            this.panelApiIO.Controls.Add(this.textBoxOutput);
            this.panelApiIO.Controls.Add(this.label1);
            this.panelApiIO.Controls.Add(this.textBoxInput);
            this.panelApiIO.Controls.Add(this.label2);
            this.panelApiIO.Location = new System.Drawing.Point(1, 1);
            this.panelApiIO.Name = "panelApiIO";
            this.panelApiIO.Size = new System.Drawing.Size(687, 649);
            this.panelApiIO.TabIndex = 22;
            // 
            // panelSyslogIO
            // 
            this.panelSyslogIO.Controls.Add(this.textBoxSyslogOutput);
            this.panelSyslogIO.Controls.Add(this.label3);
            this.panelSyslogIO.Location = new System.Drawing.Point(1, 1);
            this.panelSyslogIO.Name = "panelSyslogIO";
            this.panelSyslogIO.Size = new System.Drawing.Size(687, 649);
            this.panelSyslogIO.TabIndex = 23;
            // 
            // textBoxSyslogOutput
            // 
            this.textBoxSyslogOutput.Location = new System.Drawing.Point(10, 21);
            this.textBoxSyslogOutput.Margin = new System.Windows.Forms.Padding(2);
            this.textBoxSyslogOutput.Multiline = true;
            this.textBoxSyslogOutput.Name = "textBoxSyslogOutput";
            this.textBoxSyslogOutput.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.textBoxSyslogOutput.Size = new System.Drawing.Size(668, 624);
            this.textBoxSyslogOutput.TabIndex = 1;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(10, 6);
            this.label3.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(74, 13);
            this.label3.TabIndex = 7;
            this.label3.Text = "Syslog Stream";
            // 
            // panelSyslog
            // 
            this.panelSyslog.Controls.Add(this.textBoxPort);
            this.panelSyslog.Controls.Add(this.textBoxHost);
            this.panelSyslog.Controls.Add(this.label4);
            this.panelSyslog.Controls.Add(this.label5);
            this.panelSyslog.Controls.Add(this.buttonSyslogStart);
            this.panelSyslog.Controls.Add(this.buttonSyslogStop);
            this.panelSyslog.Location = new System.Drawing.Point(716, 35);
            this.panelSyslog.Name = "panelSyslog";
            this.panelSyslog.Size = new System.Drawing.Size(229, 477);
            this.panelSyslog.TabIndex = 9;
            // 
            // textBoxPort
            // 
            this.textBoxPort.Location = new System.Drawing.Point(14, 59);
            this.textBoxPort.Name = "textBoxPort";
            this.textBoxPort.Size = new System.Drawing.Size(194, 20);
            this.textBoxPort.TabIndex = 26;
            this.textBoxPort.Text = "20514";
            // 
            // textBoxHost
            // 
            this.textBoxHost.Location = new System.Drawing.Point(14, 21);
            this.textBoxHost.Name = "textBoxHost";
            this.textBoxHost.Size = new System.Drawing.Size(194, 20);
            this.textBoxHost.TabIndex = 25;
            this.textBoxHost.Text = "127.0.0.1";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(10, 5);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(32, 13);
            this.label4.TabIndex = 24;
            this.label4.Text = "Host:";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(10, 44);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(29, 13);
            this.label5.TabIndex = 21;
            this.label5.Text = "Port:";
            // 
            // CylanceSampleWPFAppForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(976, 648);
            this.Controls.Add(this.buttonSyslogPanel);
            this.Controls.Add(this.buttonInstaQuery);
            this.Controls.Add(this.buttonThreatPanel);
            this.Controls.Add(this.buttonUserPanel);
            this.Controls.Add(this.buttonNextPage);
            this.Controls.Add(this.buttonPreviousPage);
            this.Controls.Add(this.panelApiIO);
            this.Controls.Add(this.panelSyslogIO);
            this.Controls.Add(this.panelUser);
            this.Controls.Add(this.panelThreat);
            this.Controls.Add(this.panelInstaQuery);
            this.Controls.Add(this.panelSyslog);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "CylanceSampleWPFAppForm";
            this.Text = "CylanceSampleWPFApp";
            this.panelUser.ResumeLayout(false);
            this.panelThreat.ResumeLayout(false);
            this.panelInstaQuery.ResumeLayout(false);
            this.panelApiIO.ResumeLayout(false);
            this.panelApiIO.PerformLayout();
            this.panelSyslogIO.ResumeLayout(false);
            this.panelSyslogIO.PerformLayout();
            this.panelSyslog.ResumeLayout(false);
            this.panelSyslog.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.TextBox textBoxOutput;
        private System.Windows.Forms.Button buttonPreviousPage;
        private System.Windows.Forms.Button buttonNextPage;
        private System.Windows.Forms.TextBox textBoxInput;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Panel panelUser;
        private System.Windows.Forms.Button buttonDeleteUser;
        private System.Windows.Forms.Button buttonGetMultiUsers;
        private System.Windows.Forms.Button buttonCreateUser;
        private System.Windows.Forms.Button buttonGetUser;
        private System.Windows.Forms.Button buttonUserPanel;
        private System.Windows.Forms.Button buttonThreatPanel;
        private System.Windows.Forms.Panel panelThreat;
        private System.Windows.Forms.Button buttonGetThreatsLast24;
        private System.Windows.Forms.Button buttonGetThreat;
        private System.Windows.Forms.Button buttonInstaQuery;
        private System.Windows.Forms.Panel panelInstaQuery;
        private System.Windows.Forms.Button buttonMultipleInstaQuery;
        private System.Windows.Forms.Button buttonGetInstaQueryResults;
        private System.Windows.Forms.Button buttonGetInstaQuery;
        private System.Windows.Forms.Button buttonGetMultiThreats;
        private System.Windows.Forms.Button buttonSyslogStart;
        private System.Windows.Forms.Button buttonSyslogStop;
        private System.Windows.Forms.Button buttonSyslogPanel;
        private System.Windows.Forms.Panel panelApiIO;
        private System.Windows.Forms.Panel panelSyslogIO;
        private System.Windows.Forms.TextBox textBoxSyslogOutput;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Panel panelSyslog;
        private System.Windows.Forms.TextBox textBoxPort;
        private System.Windows.Forms.TextBox textBoxHost;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
    }
}

