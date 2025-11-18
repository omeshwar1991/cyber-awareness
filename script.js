
          let activeTab = null;
          let activeSubTab = null;
          let activeFilters = {};
          let allData = {};
          let tabNames = {};
          let currentPage = 1;
          const rowsPerPage = 100;
          let isLoading = false;
          const fileInput = document.getElementById("file-input");
          const cleanedDataTable = document.getElementById("cleaned-data");
          const tabsDiv = document.getElementById("tabs");
          const subTabsDiv = document.getElementById("sub-tabs");
          const commonColors = {};

          const headerMappings = {
              VI: {
                  "Target /A PARTY NUMBER": "Target No",
                  CALL_TYPE: "Call Type",
                  "Type of Connection": "TOC",
                  "B PARTY NUMBER": "B Party",
                  "LRN- B Party Number": "LRN No",
                  "Translation of LRN": "LRN",
                  "Call date": "Date",
                  "Call Initiation Time": "Time",
                  "Call Duration": "Duration",
                  "First BTS Location": "First BTS",
                  "First Cell Global Id": "First Cell ID",
                  "Last BTS Location": "Last BTS",
                  "Last Cell Global Id": "Last Cell ID",
                  "SMS Centre Number": "SMS Center",
                  "Service Type": "Service Type",
                  IMEI: "IMEI",
                  IMSI: "IMSI",
                  "Call Forwarding Number": "Call FWD",
                  "Roaming Network/Circle": "Roming",
                  "MSC ID": "MSC ID",
                  "In TG": "IN TG",
                  "Out TG": "OUT TG",
              },
              Jio: {
                  "Calling Party Telephone Number": "Target No",
                  "Called Party Telephone Number": "B Party",
                  "Call Forwarding": "Call FWD",
                  "LRN Called No": "LRN",
                  "Call Date": "Date",
                  "Call Time": "Time",
                  "Call Termination Time": "Call TT",
                  "Call Duration": "Duration",
                  "First Cell ID": "First Cell ID",
                  "Last Cell ID": "Last Cell ID",
                  "Call Type": "Call Type",
                  "SMS Center Number": "SMS Center",
                  IMEI: "IMEI",
                  IMSI: "IMSI",
                  "Roaming Circle Name": "Roming",
              },
              Jio22: {
                  "Target / A Party Number": "Target No",
                  "Call Type (In/Out)": "Call Type",
                  "Type of Connection": "TOC",
                  "B Party Number": "B Party",
                  "LRN Called No": "LRNN",
                  "LRN Operator Name with LSA": "LRN",
                  "Call Date": "Date",
                  "Call Time": "Time",
                  "Call Duration": "Duration",
                  "First BTS Location-Address": "First Cell ID Address",
                  "First Cell ID": "First Cell ID",
                  "Last BTS Location-Address": "Last Cell ID Address",
                  "Last Cell ID": "Last Cell ID",
                  "SMS Center Number": "SMS Center",
                  "Service Type (Voice/SMS)": "Service Type",
                  IMEI: "IMEI",
                  IMSI: "IMSI",
                  "Call Forwarding Number": "Call FWD",
                  "Roaming Circle Name": "Roming",
                  "Switch ID / MSC ID": "MSC ID",
                  "In TG": "IN TG",
                  "Out TG": "OUT TG",
              },
              Airtel: {
                  "Target No": "Target No",
                  "Call Type": "Call Type",
                  TOC: "TOC",
                  "B Party No": "B Party",
                  "LRN No": "LRN No",
                  "LRN TSP-LSA": "LRN",
                  Date: "Date",
                  Time: "Time",
                  "Dur(s)": "Duration",
                  "First CGI": "First BTS",
                  "First CGI Lat/Long": "First Cell ID",
                  "Last CGI": "Last BTS",
                  "Last CGI Lat/Long": "Last Cell ID",
                  "SMSC No": "SMS Center",
                  "Service Type": "Service Type",
                  IMEI: "IMEI",
                  IMSI: "IMSI",
                  "Call Fow No": "Call FWD",
                  "Roam Nw": "Roming",
                  "SW & MSC ID": "MSC ID",
                  "IN TG": "IN TG",
                  "OUT TG": "OUT TG",
                  "Vowifi First UE IP": "VoWiFi First IP",
                  Port1: "Port1",
                  "Vowifi Last UE IP": "VoWiFi Last IP",
                  Port2: "Port2",
              },
              BSNL: {
                  "Target/A-Party Number": "Target No",
                  Call_Type: "Call Type",
                  Type_Of_Conn: "TOC",
                  "B_Party Number": "B Party",
                  LRN_B_Party_No: "LRN No",
                  LRN_DESCRIPTION: "LRN",
                  Call_Date: "Date",
                  "Call_Initiation_Time(CIT)": "Time",
                  Call_Duration: "Duration",
                  First_Cell_Desc: "First Cell ID Address",
                  First_Cell_id: "First Cell ID",
                  Last_Cell_Desc: "Last Cell ID Address",
                  Last_Cell_ID: "Last Cell ID",
                  SMSC_No: "SMS Center",
                  Service_Type: "Service Type",
                  IMEI: "IMEI",
                  IMSI: "IMSI",
                  Call_FOW_No: "Call FWD",
                  Circle_NW: "Roming",
                  MSC_ID: "MSC ID",
                  IN_TG: "IN TG",
                  OUT_TG: "OUT TG",
              },
          };
          // ????? ?? ??? ????? ?????? ??? ?????? (HTML ???? ?? <script> ??? ?? ???? ??????? ??? ??????)
          const operatorColors = {
              VI: "#FFFFE0", // ???? ????
              Airtel: "#FFCCCB", // ???? ???
              Jio: "#E6E6FA", // ???? ???? ????
              Jio22: "#E6E6FA", // ???? ???? ???? (?? ???? ???? ?? ???)
              BSNL: "#87CEEB", // ???? ????? ???
              default: "#f78c00", // ??????? ????? ???
          };

          // ?????? ????? ?? ??? ???? ?????
          const operatorActiveColors = {
              VI: "#FFD700", // ???? ????
              Airtel: "#ff0000", // ???? ???
              Jio: "#000080", // ???? ???? ????
              Jio22: "#000080", // ???? ???? ????
              BSNL: "#4682B4", // ???? ????? ????
              default: "#05004e", // ??????? ???? ???
          };

          // ????? ?? ??????? ???
          const operatorTextColors = {
              VI: "#000000", // ???? ???????
              Airtel: "#000000", // ???? ???????
              Jio: "#000000", // ???? ???????
              Jio22: "#000000", // ???? ???????
              BSNL: "#000000", // ???? ???????
              default: "#000000", // ??????? ??????? ???
          };

          // ?????? ????? ?? ??? ??????? ???
          const operatorActiveTextColors = {
              VI: "#000000", // ???? ???????
              Airtel: "#FFFFFF", // ???? ???????
              Jio: "#FFFFFF", // ???? ???????
              Jio22: "#FFFFFF", // ???? ???????
              BSNL: "#FFFFFF", // ???? ???????
              default: "#FFFFFF", // ??????? ?????? ??????? ???
          };
          let db;

          const request = indexedDB.open("CDRDatabase", 2);

          request.onupgradeneeded = function (event) {
              db = event.target.result;
              if (!db.objectStoreNames.contains("FileData")) {
                  db.createObjectStore("FileData", { keyPath: "fileName" });
              }
          };

          request.onsuccess = function (event) {
              db = event.target.result;
          };

          request.onerror = function (event) { };

          function storeFileDataInIndexedDB(fileName, cleanedData) {
              if (!db) {
                  return;
              }

              const transaction = db.transaction(["FileData"], "readwrite");
              const store = transaction.objectStore("FileData");

              const record = {
                  fileName: fileName,
                  data: cleanedData,
              };

              const request = store.put(record);

              request.onerror = function (event) { };

              request.onsuccess = function (event) { };
          }

          function filterDataInIndexedDB(fileName, filterCriteria) {
              return new Promise((resolve, reject) => {
                  const transaction = db.transaction(["FileData"], "readonly");
                  const store = transaction.objectStore("FileData");

                  const request = store.get(fileName);

                  request.onsuccess = function (event) {
                      if (request.result) {
                          const data = request.result.data;
                          const filteredData = data.filter((row) => {
                              return Object.entries(filterCriteria).every(
                                  ([columnName, value]) => {
                                      const columnIndex = data[0].indexOf(columnName);
                                      return row[columnIndex] === value;
                                  }
                              );
                          });
                          resolve(filteredData);
                      } else {
                          reject("No data found for file: " + fileName);
                      }
                  };

                  request.onerror = function (event) {
                      reject(
                          "Error fetching file data from IndexedDB: " +
                          event.target.errorCode
                      );
                  };
              });
          }

          function fetchFileDataFromIndexedDB(fileName, filterCriteria = null) {
              return new Promise((resolve, reject) => {
                  const transaction = db.transaction(["FileData"], "readonly");
                  const store = transaction.objectStore("FileData");

                  const request = store.get(fileName);

                  request.onsuccess = function (event) {
                      if (request.result) {
                          let data = request.result.data;

                          if (filterCriteria) {
                              data = data.filter((row) => {
                                  if (row === data[0]) return true; // ???? ?? ?? ????? ????? ????
                                  return Object.entries(filterCriteria).every(
                                      ([columnName, value]) => {
                                          const columnIndex = data[0].indexOf(columnName);
                                          if (columnIndex === -1) return true; // ??? ???? ???? ???? ?? ??????? ? ????
                                          return row[columnIndex] === value;
                                      }
                                  );
                              });
                          }

                          resolve(data);
                      } else {
                          reject("No data found for file: " + fileName);
                      }
                  };

                  request.onerror = function (event) {
                      reject(
                          "Error fetching file data from IndexedDB: " +
                          event.target.errorCode
                      );
                  };
              });
          }

          // ????? ?????? ??????? ???? ?? ??? ????? ???????
          async function getUniqueValuesFromIndexedDB(fileName, columnName) {
              try {
                  const data = await fetchFileDataFromIndexedDB(fileName);
                  const columnIndex = data[0].indexOf(columnName);
                  if (columnIndex === -1) {
                      throw new Error(`Column '${columnName}' not found in the data.`);
                  }
                  const uniqueValues = new Set(
                      data.slice(1).map((row) => row[columnIndex])
                  );
                  return Array.from(uniqueValues);
              } catch (error) {
                  return [];
              }
          }

          function calculateLuhnDigit(imei) {
              imei = imei.replace(/[^0-9]/g, "");
              var sum = 0;
              var digit = 0;

              for (var i = 0; i < imei.length; i++) {
                  digit = parseInt(imei.charAt(i));
                  if (i % 2 !== 0) digit = digit * 2;
                  if (digit > 9) digit = digit - 9;
                  sum = sum + digit;
              }

              var luhnDigit = (10 - (sum % 10)) % 10;
              return luhnDigit.toString();
          }

          function swapNumbers(
              data,
              callingPartyIndex,
              calledPartyIndex,
              callTypeIndex
          ) {
              if (
                  callingPartyIndex !== -1 &&
                  calledPartyIndex !== -1 &&
                  callTypeIndex !== -1
              ) {
                  return data.map((row, index) => {
                      if (index === 0) return row;
                      if (row[callTypeIndex].toLowerCase().includes("in")) {
                          [row[callingPartyIndex], row[calledPartyIndex]] = [
                              row[calledPartyIndex],
                              row[callingPartyIndex],
                          ];
                      }
                      return row;
                  });
              } else {
                  return data;
              }
          }

          function formatDate(dateStr) {
              if (!dateStr) return dateStr;

              // Remove quotes and trim spaces
              dateStr = dateStr.replace(/['"]/g, "").trim();

              // Add month name to numeric conversion for BSNL format (e.g., 30-APR-2022)
              const monthMap = {
                  JAN: "01",
                  FEB: "02",
                  MAR: "03",
                  APR: "04",
                  MAY: "05",
                  JUN: "06",
                  JUL: "07",
                  AUG: "08",
                  SEP: "09",
                  OCT: "10",
                  NOV: "11",
                  DEC: "12",
              };

              // Check if date is in DD-MMM-YYYY format (like 30-APR-2022)
              if (/^\d{2}-[A-Z]{3}-\d{4}$/.test(dateStr)) {
                  const [day, monthAbbr, year] = dateStr.split("-");
                  const month = monthMap[monthAbbr];
                  return `${day}/${month}/${year}`;
              }

              // Process other date formats as before
              dateStr = dateStr.replace(/[-. ]/g, "/");
              let parts = dateStr.split("/");

              // Check if we have valid date parts
              if (parts.length !== 3) return dateStr;

              // Ensure each part has 2 digits for day and month, 4 digits for year
              let day = parts[0].padStart(2, "0");
              let month = parts[1].padStart(2, "0");
              let year = parts[2];

              // If year is in 2-digit format, convert to 4-digit
              if (year.length === 2) {
                  year = "20" + year;
              }

              // Return formatted date without quotes
              return `${day}/${month}/${year}`;
          }
          function cleanCDRData(data, fileName) {
              const lines = data.trim().split("\n");
              let cleanedData = [];
              let headerFound = false;
              let operator = null;
              let headerRow = null;
              let callingPartyIndex = -1;
              let calledPartyIndex = -1;
              let durationIndex = -1;
              let imeiIndex = -1;
              let callTypeIndex = -1;
              let blankRowFound = false;
              let deleteNextLine = false;

              // ???? ????? ?? ???? ???-???????? ?? ?? ????-????????
              const firstLine = lines[0];
              let separator = ","; // ??????? ???????

              if (firstLine.includes("\t")) {
                  separator = "\t";
              }

              for (let i = 0; i < lines.length; i++) {
                  let line = lines[i].trim();
                  let row;

                  // ??????? ?? ???? ?? ???? ?? ??????? ????
                  if (separator === "\t") {
                      row = line.split("\t").map((cell) => cell.trim());
                  } else {
                      // ????-???????? ???? ?? ??? ????? ????????
                      row = parseCSVLine(line);
                  }

                  // ????? ???? ??? ?? ????? ??? ????? ??
                  if (row[row.length - 1] === "") {
                      row.pop();
                  }

                  if (!headerFound) {
                      operator = identifyOperator(row);
                      if (operator) {
                          headerRow = row;
                          headerFound = true;
                          if (operator === "VI") {
                              deleteNextLine = true;
                          }

                          if (operator === "Jio") {
                              callingPartyIndex = headerRow.findIndex(
                                  (header) => header === "Calling Party Telephone Number"
                              );
                              calledPartyIndex = headerRow.findIndex(
                                  (header) => header === "Called Party Telephone Number"
                              );
                              durationIndex = headerRow.findIndex(
                                  (header) => header === "Call Duration"
                              );
                              callTypeIndex = headerRow.findIndex(
                                  (header) => header === "Call Type"
                              );
                          }
                          continue;
                      }
                  } else {
                      if (deleteNextLine) {
                          deleteNextLine = false;
                          continue;
                      }

                      if (row.every((cell) => cell.trim().length === 0)) {
                          blankRowFound = true;
                          continue;
                      }

                      if (blankRowFound) {
                          break;
                      }

                      // ??????? ???: ??????? ??? ?? ??????? ?? ????? ?? ???
                      const cleanedRow = row.map((cell, index) => {
                          // ??????? ??? ????
                          if (index >= headerRow.length) {
                              return cell; // ?? ??? ?? ???? ?? ???? ?? ???
                          }

                          // Format date if the column header contains 'date'
                          if (headerRow[index].toLowerCase().includes("date")) {
                              return formatDate(cell);
                          }

                          // Other cleaning operations
                          if (headerRow[index] === "First Cell Global Id") {
                              return cell.replace(/^"(.*)"$/, "$1");
                          } else {
                              return cell.replace(/'/g, "");
                          }
                      });

                      // Clean phone numbers
                      for (let j = 0; j < cleanedRow.length; j++) {
                          // ????? ?? ??? ??????? ????? ?????
                          if (cleanedRow[j]) {
                              cleanedRow[j] = cleanedRow[j].replace(/['"]/g, "");

                              // Check for 13-digit numbers starting with '091'
                              if (
                                  cleanedRow[j].length === 13 &&
                                  cleanedRow[j].startsWith("091")
                              ) {
                                  cleanedRow[j] = cleanedRow[j].slice(3);
                              }
                              // Check for 12-digit numbers starting with '91'
                              else if (
                                  cleanedRow[j].length === 12 &&
                                  cleanedRow[j].startsWith("91")
                              ) {
                                  cleanedRow[j] = cleanedRow[j].slice(2);
                              }
                              // Check for 11-digit numbers starting with '0'
                              else if (
                                  cleanedRow[j].length === 11 &&
                                  cleanedRow[j].startsWith("0")
                              ) {
                                  cleanedRow[j] = cleanedRow[j].slice(1);
                              }
                          }
                      }

                      // ????? ???? ??? ?? ????? ??? ????? ??
                      if (cleanedRow[cleanedRow.length - 1] === "") {
                          cleanedRow.pop();
                      }

                      cleanedData.push(cleanedRow);
                  }
              }

              if (headerRow) {
                  // VI ???? ?? ??? ????? ??????????
                  if (operator === "VI") {
                      let lastColumnIndex = cleanedData[0].length - 1;
                      cleanedData = cleanedData.filter(
                          (row) =>
                              row[lastColumnIndex] && row[lastColumnIndex].trim() !== ""
                      );
                  }

                  // Jio ?? 15-???? ??????? ?? ??? ???????? (Jio22 ?? ??? ????)
                  if (operator === "Jio") {
                      cleanedData = swapNumbers(
                          cleanedData,
                          callingPartyIndex,
                          calledPartyIndex,
                          callTypeIndex
                      );
                  }
                  // Inside cleanCDRData function, add this with the other operator-specific processing
                  if (operator === "BSNL") {
                      // Clean up BSNL-specific data - remove leading equal signs from all cells
                      cleanedData = cleanedData.map((row) =>
                          row.map((cell) => {
                              if (typeof cell === "string" && cell.startsWith("=")) {
                                  return cell.substring(1); // Remove the leading = sign
                              }
                              return cell;
                          })
                      );
                  }
                  // IMEI ??????????
                  imeiIndex = headerRow.findIndex((header) => header === "IMEI");

                  if (imeiIndex !== -1) {
                      for (let i = 0; i < cleanedData.length; i++) {
                          const imei = cleanedData[i][imeiIndex];
                          if (imei) {
                              if (imei.length === 15 && /^\d+$/.test(imei)) {
                                  const imeiWithoutLastDigit = imei.slice(0, -1);
                                  const luhnDigit = calculateLuhnDigit(imeiWithoutLastDigit);
                                  const uniqueIMEI = imeiWithoutLastDigit + luhnDigit;
                                  cleanedData[i][imeiIndex] = uniqueIMEI;
                              } else {
                                  const luhnDigit = calculateLuhnDigit(imei);
                                  cleanedData[i][imeiIndex] = imei + luhnDigit;
                              }
                          }
                      }
                  }

                  // ???? ?????? ???? ????
                  if (headerFound) {
                      const mapping = headerMappings[operator];
                      headerRow = headerRow.map((header) => {
                          const mapped = mapping[header] || header;
                          return mapped;
                      });
                  }

                  cleanedData.unshift(headerRow);
              } else {
                  return { cleanedData: [], operator: null }; // ???? ?????? ?????? ????
              }

              // ???? ???? ?? ????????????? ??? ????? ????
              storeFileDataInIndexedDB(fileName, cleanedData);

              return { cleanedData, operator };
          }

          // ??? ?? ???? ????? ?? ???????? CSV ?????? ?? ????? ???? ?? ??? ?????? ??????
          function parseCSVLine(line) {
              const result = [];
              let currentValue = "";
              let insideQuotes = false;

              for (let i = 0; i < line.length; i++) {
                  const char = line.charAt(i);

                  if (char === '"' || char === "'") {
                      insideQuotes = !insideQuotes;
                  } else if (char === "," && !insideQuotes) {
                      result.push(currentValue.trim());
                      currentValue = "";
                  } else {
                      currentValue += char;
                  }
              }

              // ????? ??? ?? ??????
              result.push(currentValue.trim());

              return result;
          }
          function identifyOperator(row) {
              // Existing operator identifications
              if (row.includes("Target /A PARTY NUMBER")) {
                  return "VI";
              } else if (row.includes("Target / A Party Number")) {
                  return "Jio22";
              } else if (
                  row.some(
                      (header) =>
                          header === "Target / A Party Number" ||
                          header === "Target /A Party Number"
                  )
              ) {
                  return "Jio22";
              } else if (row.includes("Calling Party Telephone Number")) {
                  return "Jio";
              } else if (row.includes("Target No")) {
                  return "Airtel";
              }
              // Add BSNL identification
              else if (row.includes("Target/A-Party Number")) {
                  return "BSNL";
              } else if (
                  row.some(
                      (header) => typeof header === "string" && header.includes("BSNL")
                  )
              ) {
                  return "BSNL";
              }

              // Additional case-insensitive checks
              const lowercaseHeaders = row.map((header) =>
                  header ? header.toLowerCase() : ""
              );
              const jio22Pattern = /target\s*\/\s*a\s*party\s*number/i;
              const bsnlPattern = /bsnl|b\.s\.n\.l|target\/a-party number/i;

              if (lowercaseHeaders.some((header) => jio22Pattern.test(header))) {
                  return "Jio22";
              } else if (
                  lowercaseHeaders.some((header) => bsnlPattern.test(header))
              ) {
                  return "BSNL";
              }

              return null;
          }

          function createTab(file, data, detectedOperator = null) {
              let fileName = file.name.replace(/\.[^/.]+$/, "");

              const mobileOrImeiPattern = /(\b91\d{10}\b|\b\d{15}\b)/;
              let match = fileName.match(mobileOrImeiPattern);

              // ???? ?? ?????? ?? ????? ???? (??? ???? ?? ??? ???? ???? ??? ??)
              const operator = detectedOperator || identifyOperator(data[0]);

              if (!match) {
                  const targetNumberIndex = data[0].indexOf("Target No");
                  if (targetNumberIndex !== -1) {
                      const targetNumbers = data
                          .slice(1)
                          .map((row) => row[targetNumberIndex]);
                      const uniqueTargetNumbers = [...new Set(targetNumbers)];

                      if (uniqueTargetNumbers.length === 1) {
                          fileName = uniqueTargetNumbers[0];
                      } else {
                          const imeiIndex = data[0].indexOf("IMEI");
                          if (imeiIndex !== -1) {
                              const imeiValues = data.slice(1).map((row) => row[imeiIndex]);
                              const uniqueImeiValues = [...new Set(imeiValues)];
                              if (uniqueImeiValues.length > 0) {
                                  fileName = uniqueImeiValues[0];
                              }
                          }
                      }
                  }
              } else {
                  fileName = match[0];
              }

              tabNames[file.name] = fileName;

              const tab = document.createElement("div");
              tab.className = "tab";
              tab.textContent = fileName;
              tab.dataset.fileName = file.name; // ???? ??? ?? ???? ?????????? ??? ????? ????
              tab.dataset.operator = operator || "default"; // ?????? ?? ???? ?????????? ??? ????? ????

              // ?????? ?? ?????? ??? ??? ????
              const bgColor = operator
                  ? operatorColors[operator] || operatorColors.default
                  : operatorColors.default;
              const textColor = operator
                  ? operatorTextColors[operator] || operatorTextColors.default
                  : operatorTextColors.default;

              // ??? ???????? CSS ??? ??? ???? (!important ??????)
              tab.style.cssText = `
          background-color: ${bgColor} !important;
          color: ${textColor} !important;
        `;

              let clickCount = 0;
              let timer = null;

              tab.addEventListener("click", () => {
                  clickCount++;

                  if (clickCount === 1) {
                      timer = setTimeout(() => {
                          clickCount = 0;
                      }, 2000);
                  }

                  if (clickCount === 3) {
                      clearTimeout(timer);
                      deleteTab(file.name);
                      return;
                  }

                  document
                      .querySelectorAll(".tab")
                      .forEach((t) => t.classList.remove("active"));
                  tab.classList.add("active");

                  // ?????? ???? ?? ?????? ?? ?????? ??? ????? ????
                  updateActiveTabStyles();

                  activeTab = file.name;
                  currentPage = 1; // ??? ????? ???? ?? ??? ???? ????? ????
                  fetchFileDataFromIndexedDB(file.name)
                      .then((data) => {
                          displaySubTabs(data); // ??-????? ??????
                          displayPageData(data, currentPage);
                      })
                      .catch((error) => { });
              });

              tabsDiv.appendChild(tab);

              // ???? ??? ?? ????? ??? ?? ??? ????? ????
              updateActiveTabStyles();

              return tab;
          }

          // ?????? ????? ?? ??? ?????? ????? ???? ???? ?????? ??????
          function updateActiveTabStyles() {
              document.querySelectorAll(".tab").forEach((tab) => {
                  const operator = tab.dataset.operator || "default";

                  if (tab.classList.contains("active")) {
                      // ?????? ??? ?? ??? ??????
                      const activeBgColor =
                          operatorActiveColors[operator] || operatorActiveColors.default;
                      const activeTextColor =
                          operatorActiveTextColors[operator] ||
                          operatorActiveTextColors.default;

                      tab.style.cssText = `
              background-color: ${activeBgColor} !important;
              color: ${activeTextColor} !important;
              font-weight: bold !important;
            `;
                  } else {
                      // ???????? ??? ?? ??? ??????
                      const bgColor = operatorColors[operator] || operatorColors.default;
                      const textColor =
                          operatorTextColors[operator] || operatorTextColors.default;

                      tab.style.cssText = `
              background-color: ${bgColor} !important;
              color: ${textColor} !important;
              font-weight: normal !important;
            `;
                  }
              });
          }

          function deleteTab(fileName) {
              // Remove the tab element
              const tab = document.querySelector(
                  `.tab[data-file-name="${fileName}"]`
              );
              if (tab) {
                  tab.remove();
              }

              // Remove the associated data from allData
              delete allData[fileName];

              // Remove the associated data from IndexedDB
              deleteFileDataFromIndexedDB(fileName);

              // If the deleted tab was active, activate the first tab
              if (activeTab === fileName) {
                  activeTab = null;
                  const firstTab = document.querySelector(".tab");
                  if (firstTab) {
                      firstTab.click();
                  }
              }
          }

          function deleteFileDataFromIndexedDB(fileName) {
              const transaction = db.transaction(["FileData"], "readwrite");
              const store = transaction.objectStore("FileData");
              const request = store.delete(fileName);

              request.onerror = function (event) { };
          }

          function displaySubTabs(data) {
              subTabsDiv.innerHTML = "";
              const subTabs = [
                  "CDR",
                  "B Party",
                  "Max Duration",
                  "Max IMEI",
                  "Max IMSI",
                  "Call Max Location",
                  "SMS Analysis",
                  "Common B Party",
                  "Common IMEI",
                  "Mobile No. Breif",
                  "Network Graph",
              ];
              subTabs.forEach((subTabName) => {
                  subTabsDiv.appendChild(createSubTab(subTabName, data));
              });
              document.querySelectorAll(".sub-tab")[0].classList.add("active");
              activeSubTab = "CDR";
              displayPageData(data, currentPage); // Load the first page of data
          }

          function createSubTab(subTabName, data) {
              const subTab = document.createElement("div");
              subTab.className = "sub-tab";
              subTab.textContent = subTabName;
              subTab.addEventListener("click", () => {
                  if (activeSubTab === subTabName) return;
                  document
                      .querySelectorAll(".sub-tab")
                      .forEach((t) => t.classList.remove("active"));
                  subTab.classList.add("active");
                  activeSubTab = subTabName;
                  currentPage = 1; // Reset the page to 1 on tab change

                  if (subTabName === "CDR") {
                      displayPageData(data, currentPage);
                      hideRadioButtons();
                  } else if (subTabName === "B Party") {
                      displayBPartyData(data);
                      hideRadioButtons();
                  } else if (subTabName === "Max Duration") {
                      displayMaxDurationData(data);
                      hideRadioButtons();
                  } else if (subTabName === "Max IMEI") {
                      displayMaxIMEIData(data);
                      hideRadioButtons();
                  } else if (subTabName === "Max IMSI") {
                      displayMaxIMSIData(data);
                      hideRadioButtons();
                  } else if (subTabName === "Call Max Location") {
                      displayMaxCallLocationData(data);
                      hideRadioButtons();
                  } else if (subTabName === "SMS Analysis") {
                      displaySMSAnalysisData(data);
                      hideRadioButtons();
                  } else if (subTabName === "Common B Party") {
                      displayCommonBPartyData();
                      showRadioButtons();
                  } else if (subTabName === "Common IMEI") {
                      displayCommonIMEIData();
                      hideRadioButtons();
                  } else if (subTabName === "Mobile No. Breif") {
                      displayInvTblData();
                      hideRadioButtons();
                  } else if (subTabName === "Network Graph") {
                      subTab.addEventListener("click", () => {
                          displayNetworkGraph();
                      });
                  }
              });
              return subTab;
          }

          function addSearchIconToHeader(headerRow) {
              headerRow.querySelectorAll("th").forEach((th, i) => {
                  const searchIcon = document.createElement("span");
                  searchIcon.innerHTML = "&#128269;";
                  searchIcon.style.cursor = "pointer";
                  searchIcon.style.color = "gray";
                  searchIcon.classList.add("search-icon");
                  searchIcon.onclick = function () {
                      toggleDropdownMenu(i, th);
                  };
                  th.appendChild(searchIcon);
              });
          }

          async function createDropdownMenu(colIndex, headerCell) {
              const dropdown = document.createElement("div");
              dropdown.className = "dropdown-menu";
              dropdown.style.position = "absolute";
              dropdown.style.backgroundColor = "#f1f1f1";
              dropdown.style.boxShadow = "0px 8px 16px 0px rgba(0,0,0,0.2)";
              dropdown.style.zIndex = "1";
              dropdown.style.width = "200px"; // Set width
              dropdown.style.height = "300px"; // Set height
              dropdown.style.overflowY = "scroll"; // Enable scrolling

              const searchBox = document.createElement("input");
              searchBox.type = "text";
              searchBox.placeholder = "Search...";
              searchBox.oninput = function () {
                  filterDropdownItems(dropdown, searchBox.value);
              };
              dropdown.appendChild(searchBox);

              const uniqueValues = await getUniqueValues(colIndex);
              uniqueValues.forEach((value) => {
                  const item = document.createElement("div");
                  const checkbox = document.createElement("input");
                  checkbox.type = "checkbox";
                  checkbox.value = value.value;
                  item.appendChild(checkbox);
                  item.appendChild(
                      document.createTextNode(`${value.value} (${value.count})`)
                  );
                  dropdown.appendChild(item);
              });

              document.body.appendChild(dropdown);
              positionDropdownMenu(dropdown, headerCell);
              dropdown.style.display = "block";

              // Add event listener for checkbox changes
              dropdown.addEventListener("change", function () {
                  filterTableByCheckbox(colIndex);
              });

              // Stop event propagation when clicking inside the dropdown
              dropdown.addEventListener("click", function (event) {
                  event.stopPropagation();
              });

              return dropdown;
          }

          let currentDropdown = null;

          async function toggleDropdownMenu(colIndex, headerCell) {
              const existingDropdown = document.querySelector(".dropdown-menu");
              if (existingDropdown) {
                  existingDropdown.remove();
                  currentDropdown = null;
              } else {
                  const dropdown = await createDropdownMenu(colIndex, headerCell);
                  currentDropdown = dropdown;
                  setTimeout(() => {
                      document.addEventListener("click", handleClickOutside);
                  }, 0);
              }
          }

          function handleClickOutside(event) {
              if (
                  currentDropdown &&
                  !currentDropdown.contains(event.target) &&
                  !(
                      event.target.closest("th") &&
                      event.target.closest("th").contains(currentDropdown)
                  )
              ) {
                  currentDropdown.remove();
                  currentDropdown = null;
                  document.removeEventListener("click", handleClickOutside);
              }
          }

          async function getUniqueValues(colIndex) {
              const fileName = activeTab;
              const data = await fetchFileDataFromIndexedDB(fileName);

              const values = {};
              data.slice(1).forEach((row) => {
                  const cellValue = row[colIndex];
                  if (values[cellValue]) {
                      values[cellValue]++;
                  } else {
                      values[cellValue] = 1;
                  }
              });

              return Object.keys(values).map((value) => ({
                  value,
                  count: values[value],
              }));
          }

          function filterDropdownItems(dropdown, query) {
              const items = dropdown.querySelectorAll("div");
              items.forEach((item) => {
                  if (item.textContent.toLowerCase().includes(query.toLowerCase())) {
                      item.style.display = "";
                  } else {
                      item.style.display = "none";
                  }
              });
          }

          async function filterTableByCheckbox(colIndex) {
              const checkedValues = Array.from(
                  document.querySelectorAll(
                      '.dropdown-menu input[type="checkbox"]:checked'
                  )
              ).map((cb) => cb.value);

              const headerCell =
                  cleanedDataTable.querySelector("tr:first-child").children[colIndex];
              const headerName = headerCell.textContent.replace("??", "").trim();

              if (checkedValues.length > 0) {
                  try {
                      // ???????? ???? IndexedDB ?? ????
                      const filteredData = await getFilteredDataFromIndexedDB(
                          activeTab,
                          headerName,
                          checkedValues
                      );

                      // ???? ??? ???????? ???? ??????
                      displayFilteredData(filteredData);

                      const searchIcon =
                          document.querySelectorAll(".search-icon")[colIndex];
                      searchIcon.style.color = "blue";
                  } catch (error) {
                      console.error("Error applying filter:", error);
                  }
              } else {
                  // ?????? ???? ?? ?? ??? ???? ????
                  try {
                      const allData = await fetchFileDataFromIndexedDB(activeTab);
                      displayPageData(allData, 1);

                      const searchIcon =
                          document.querySelectorAll(".search-icon")[colIndex];
                      searchIcon.style.color = "gray";
                  } catch (error) {
                      console.error("Error removing filter:", error);
                  }
              }
          }

          function displayFilteredData(filteredData) {
              cleanedDataTable.innerHTML = "";

              if (filteredData.length > 0) {
                  const headerRow = document.createElement("tr");
                  filteredData[0].forEach((cell) => {
                      const th = document.createElement("th");
                      th.textContent = cell;
                      headerRow.appendChild(th);
                  });
                  cleanedDataTable.appendChild(headerRow);
                  addSearchIconToHeader(headerRow);

                  for (let i = 1; i < filteredData.length; i++) {
                      const rowElem = document.createElement("tr");
                      filteredData[i].forEach((cell) => {
                          const td = document.createElement("td");
                          td.textContent = cell;
                          td.setAttribute("data-text", cell);
                          rowElem.appendChild(td);
                      });
                      cleanedDataTable.appendChild(rowElem);
                  }
              }
          }
          async function getFilteredDataFromIndexedDB(
              fileName,
              columnName,
              allowedValues
          ) {
              return new Promise((resolve, reject) => {
                  const transaction = db.transaction(["FileData"], "readonly");
                  const store = transaction.objectStore("FileData");

                  const request = store.get(fileName);

                  request.onsuccess = function (event) {
                      if (request.result) {
                          const data = request.result.data;
                          const columnIndex = data[0].indexOf(columnName);

                          if (columnIndex === -1) {
                              reject(`Column ${columnName} not found in data`);
                              return;
                          }

                          const filteredData = [data[0]]; // ???? ?? ????

                          for (let i = 1; i < data.length; i++) {
                              const row = data[i];
                              const cellValue = row[columnIndex];

                              if (allowedValues.includes(cellValue)) {
                                  filteredData.push(row);
                              }
                          }

                          resolve(filteredData);
                      } else {
                          reject(`No data found for file: ${fileName}`);
                      }
                  };

                  request.onerror = function (event) {
                      reject(
                          `Error fetching file data from IndexedDB: ${event.target.errorCode}`
                      );
                  };
              });
          }
          function positionDropdownMenu(dropdown, headerCell) {
              const rect = headerCell.getBoundingClientRect();
              dropdown.style.left = `${rect.left}px`;
              dropdown.style.top = `${rect.bottom}px`;
          }

          function displayPageData(data, page) {
              const startIndex = (page - 1) * rowsPerPage;
              const endIndex = startIndex + rowsPerPage;
              const pageData = data.slice(startIndex, endIndex);

              if (page === 1) {
                  cleanedDataTable.innerHTML = "";
                  if (pageData.length > 0) {
                      const headerRow = document.createElement("tr");
                      data[0].forEach((cell) => {
                          const th = document.createElement("th");
                          th.textContent = cell;
                          headerRow.appendChild(th);
                      });
                      cleanedDataTable.appendChild(headerRow);
                      addSearchIconToHeader(headerRow);
                  }
              }

              pageData.forEach((row, index) => {
                  if (index === 0 && page === 1) return; // Skip header row for first page
                  const rowElem = document.createElement("tr");
                  row.forEach((cell) => {
                      const td = document.createElement("td");
                      td.textContent = cell;
                      td.setAttribute("data-text", cell);
                      rowElem.appendChild(td);
                  });
                  cleanedDataTable.appendChild(rowElem);
              });
          }

          let clickCount = 0;

          document.addEventListener("click", function (event) {
              if (!cleanedDataTable.contains(event.target)) {
                  clickCount++;
                  if (clickCount === 3) {
                      removeAllFilters();
                      clickCount = 0;
                  }
              } else {
                  clickCount = 0;
              }
          });

          function removeAllFilters() {
              const rows = cleanedDataTable.querySelectorAll("tr:not(:first-child)");
              rows.forEach((row) => {
                  row.style.display = "";
              });
              document.querySelectorAll(".search-icon").forEach((icon) => {
                  icon.style.color = "Red";
              });
              const existingDropdown = document.querySelector(".dropdown-menu");
              if (existingDropdown) {
                  existingDropdown.remove();
              }
          }

          function displayBPartyData(data) {
              if (!data.length) {
                  cleanedDataTable.innerHTML = "";
                  document.getElementById("map").style.display = "none";
                  return;
              }

              const bPartyIndex = data[0].indexOf("B Party");
              const lrnIndex = data[0].indexOf("LRN");
              const dateIndex = data[0].indexOf("Date");
              const timeIndex = data[0].indexOf("Time");

              if (
                  bPartyIndex === -1 ||
                  lrnIndex === -1 ||
                  dateIndex === -1 ||
                  timeIndex === -1
              )
                  return;

              // Process B Party data with call timestamps
              const bPartyCount = data.slice(1).reduce((acc, row) => {
                  const bParty = row[bPartyIndex];
                  const rawDate = row[dateIndex];
                  const rawTime = row[timeIndex];

                  if (/^[6-9][0-9]{9}$/.test(bParty)) {
                      if (!acc[bParty]) {
                          acc[bParty] = {
                              count: 0,
                              lrn: row[lrnIndex],
                              firstCall: {
                                  date: rawDate,
                                  time: rawTime,
                              },
                              lastCall: {
                                  date: rawDate,
                                  time: rawTime,
                              },
                          };
                      } else {
                          // Compare dates for first call
                          const currentDate = new Date(`${rawDate} ${rawTime}`);
                          const existingFirstDate = new Date(
                              `${acc[bParty].firstCall.date} ${acc[bParty].firstCall.time}`
                          );
                          const existingLastDate = new Date(
                              `${acc[bParty].lastCall.date} ${acc[bParty].lastCall.time}`
                          );

                          if (
                              !isNaN(currentDate.getTime()) &&
                              !isNaN(existingFirstDate.getTime())
                          ) {
                              if (currentDate < existingFirstDate) {
                                  acc[bParty].firstCall = { date: rawDate, time: rawTime };
                              }
                              if (currentDate > existingLastDate) {
                                  acc[bParty].lastCall = { date: rawDate, time: rawTime };
                              }
                          }
                      }
                      acc[bParty].count++;
                  }
                  return acc;
              }, {});

              // Create table HTML
              cleanedDataTable.innerHTML = `
              <tr>
                  <th>B Party</th>
                  <th>Count</th>
                  <th>LRN</th>
                  <th>First Call</th>
                  <th>Last Call</th>
              </tr>
              ${Object.entries(bPartyCount)
                      .sort((a, b) => b[1].count - a[1].count)
                      .map(
                          ([bParty, { count, lrn, firstCall, lastCall }]) => `
                      <tr>
                          <td>${bParty}</td>
                          <td>${count}</td>
                          <td>${lrn}</td>
                          <td>${firstCall.date} ${firstCall.time}</td>
                          <td>${lastCall.date} ${lastCall.time}</td>
                      </tr>
                  `
                      )
                      .join("")}
          `;

              document.getElementById("map").style.display = "none";
          }
          function displayMaxDurationData(data) {
              cleanedDataTable.innerHTML = "";
              if (data.length > 0) {
                  const bPartyIndex = data[0].indexOf("B Party");
                  const durationIndex = data[0].indexOf("Duration");
                  if (bPartyIndex !== -1 && durationIndex !== -1) {
                      const bPartyDurationSum = data.slice(1).reduce((acc, row) => {
                          const bParty = row[bPartyIndex];
                          const duration = parseFloat(row[durationIndex]);
                          if (bParty && !isNaN(duration) && /^[0-9]+$/.test(bParty)) {
                              if (!acc[bParty]) {
                                  acc[bParty] = 0;
                              }
                              acc[bParty] += duration;
                          }
                          return acc;
                      }, {});

                      const filteredDurationSum = Object.entries(bPartyDurationSum)
                          .filter(([_, sum]) => sum > 0)
                          .sort((a, b) => b[1] - a[1]);

                      const headerRow = document.createElement("tr");
                      const th1 = document.createElement("th");
                      th1.textContent = "B Party";
                      headerRow.appendChild(th1);
                      const th2 = document.createElement("th");
                      th2.textContent = "Total Duration";
                      headerRow.appendChild(th2);
                      cleanedDataTable.appendChild(headerRow);

                      filteredDurationSum.forEach(([bParty, sum]) => {
                          const rowElem = document.createElement("tr");
                          const td1 = document.createElement("td");
                          td1.textContent = bParty;
                          rowElem.appendChild(td1);
                          const td2 = document.createElement("td");
                          td2.textContent = Math.floor(sum);
                          rowElem.appendChild(td2);
                          cleanedDataTable.appendChild(rowElem);
                      });
                  }
              }
              document.getElementById("map").style.display = "none";
          }

          async function getDeviceDetail(tac) {
              try {
                  // Check if data for tac is already in cache
                  if (cache[tac]) {
                      return cache[tac];
                  }

                  const response = await fetch(
                      `https://investigationcamp.com/imei2.php?tac=${tac}`
                  );
                  let data = await response.json(); // Change this line

                  // Check if the response is an array and if so, use the first object
                  if (Array.isArray(data)) {
                      data = data[0]; // Now this line is valid
                  }

                  const deviceDetail = data.DeviceDetail;

                  // Store the fetched detail in the cache
                  cache[tac] = deviceDetail;

                  return deviceDetail;
              } catch (error) {
                  return "N/A";
              }
          }

          async function displayMaxIMEIData(data) {
              cleanedDataTable.innerHTML = "";
              if (data.length === 0) {
                  document.getElementById("map").style.display = "none";
                  return;
              }

              const imeiIndex = data[0].indexOf("IMEI");
              const targetNumberIndex = data[0].indexOf("Target No");
              const dateIndex = data[0].indexOf("Date");
              const timeIndex = data[0].indexOf("Time");
              const bPartyIndex = data[0].indexOf("B Party");

              if (
                  [
                      imeiIndex,
                      targetNumberIndex,
                      dateIndex,
                      timeIndex,
                      bPartyIndex,
                  ].includes(-1)
              ) {
                  document.getElementById("map").style.display = "none";
                  return;
              }

              // IMEI -> Set of target numbers
              const imeiData = {};
              for (let i = 1; i < data.length; i++) {
                  const row = data[i];
                  const imei = row[imeiIndex];
                  const tNumber = row[targetNumberIndex];
                  if (imei && tNumber) {
                      if (!imeiData[imei]) imeiData[imei] = new Set();
                      imeiData[imei].add(tNumber);
                  }
              }

              // Define columns
              const headers = [
                  "IMEI",
                  "Device Detail",
                  "Target Numbers",
                  "First Call",
                  "First Call B Party",
                  "Last Call",
                  "Last Call B Party",
              ];
              const headerRow = document.createElement("tr");
              headers.forEach((h) => {
                  const th = document.createElement("th");
                  th.textContent = h;
                  headerRow.appendChild(th);
              });
              cleanedDataTable.appendChild(headerRow);

              for (const imei of Object.keys(imeiData)) {
                  const targetNumbers = Array.from(imeiData[imei]);

                  // Device detail fetch (assuming getDeviceDetail is defined somewhere)
                  const deviceDetail = await getDeviceDetail(imei.slice(0, 8));

                  const targetLines = [];
                  const firstCallLines = [];
                  const firstCallBPartyLines = [];
                  const lastCallLines = [];
                  const lastCallBPartyLines = [];

                  for (const tNumber of targetNumbers) {
                      const calls = [];
                      for (let i = 1; i < data.length; i++) {
                          const row = data[i];
                          if (
                              row[imeiIndex] === imei &&
                              row[targetNumberIndex] === tNumber
                          ) {
                              const [dayStr, monthStr, yearStr] = row[dateIndex].split("/");
                              const [hoursStr, minutesStr, secondsStr] =
                                  row[timeIndex].split(":");
                              const callDate = new Date(
                                  parseInt(yearStr, 10),
                                  parseInt(monthStr, 10) - 1,
                                  parseInt(dayStr, 10),
                                  parseInt(hoursStr, 10),
                                  parseInt(minutesStr, 10),
                                  parseInt(secondsStr, 10)
                              );
                              calls.push({
                                  target: tNumber,
                                  date: row[dateIndex],
                                  time: row[timeIndex],
                                  datetime: callDate,
                                  bParty: row[bPartyIndex],
                              });
                          }
                      }

                      calls.sort((a, b) => a.datetime - b.datetime);
                      if (calls.length === 0) {
                          targetLines.push(tNumber);
                          firstCallLines.push("No Calls");
                          firstCallBPartyLines.push("No BParty");
                          lastCallLines.push("No Calls");
                          lastCallBPartyLines.push("No BParty");
                      } else {
                          const earliestCall = calls[0];
                          const latestCall = calls[calls.length - 1];
                          targetLines.push(tNumber);
                          firstCallLines.push(`${earliestCall.date} ${earliestCall.time}`);
                          firstCallBPartyLines.push(earliestCall.bParty || "");
                          lastCallLines.push(`${latestCall.date} ${latestCall.time}`);
                          lastCallBPartyLines.push(latestCall.bParty || "");
                      }
                  }

                  const rowElem = document.createElement("tr");

                  function createCell(text) {
                      const td = document.createElement("td");
                      td.textContent = text;
                      td.style.whiteSpace = "pre";
                      return td;
                  }

                  // Fill row: IMEI, Device Detail, Targets, First Call, First Call B Party, Last Call, Last Call B Party
                  rowElem.appendChild(createCell(imei));
                  rowElem.appendChild(createCell(deviceDetail || ""));
                  rowElem.appendChild(createCell(targetLines.join("\n")));
                  rowElem.appendChild(createCell(firstCallLines.join("\n")));
                  rowElem.appendChild(createCell(firstCallBPartyLines.join("\n")));
                  rowElem.appendChild(createCell(lastCallLines.join("\n")));
                  rowElem.appendChild(createCell(lastCallBPartyLines.join("\n")));

                  cleanedDataTable.appendChild(rowElem);
              }

              document.getElementById("map").style.display = "none";
          }

          function displayMaxIMSIData(data) {
              cleanedDataTable.innerHTML = "";
              if (data.length > 0) {
                  const imsiIndex = data[0].indexOf("IMSI");
                  const targetNumberIndex = data[0].indexOf("Target No");
                  if (imsiIndex !== -1 && targetNumberIndex !== -1) {
                      const imsiCount = data.slice(1).reduce((acc, row) => {
                          const imsi = row[imsiIndex];
                          const targetNumber = row[targetNumberIndex];
                          if (imsi) {
                              if (!acc[imsi]) {
                                  acc[imsi] = { count: 0, targetNumber: targetNumber };
                              }
                              acc[imsi].count++;
                          }
                          return acc;
                      }, {});

                      const sortedIMSICount = Object.entries(imsiCount).sort(
                          (a, b) => b[1].count - a[1].count
                      );

                      const headerRow = document.createElement("tr");
                      const th1 = document.createElement("th");
                      th1.textContent = "IMSI";
                      headerRow.appendChild(th1);
                      const th2 = document.createElement("th");
                      th2.textContent = "Target No";
                      headerRow.appendChild(th2);
                      const th3 = document.createElement("th");
                      th3.textContent = "Count";
                      headerRow.appendChild(th3);
                      cleanedDataTable.appendChild(headerRow);

                      sortedIMSICount.forEach(([imsi, { count, targetNumber }]) => {
                          const rowElem = document.createElement("tr");
                          const td1 = document.createElement("td");
                          td1.textContent = imsi;
                          rowElem.appendChild(td1);
                          const td2 = document.createElement("td");
                          td2.textContent = targetNumber;
                          rowElem.appendChild(td2);
                          const td3 = document.createElement("td");
                          td3.textContent = count;
                          rowElem.appendChild(td3);
                          cleanedDataTable.appendChild(rowElem);
                      });
                  }
              }
              document.getElementById("map").style.display = "none";
          }

          let map;
          let markers = [];
          let activeMarker = null;
          let polyline = null;
          const distanceLabels = [];
          let animationIntervalId = null;
          window.addEventListener("load", function () {
              initMap();
          });
          function initMap() {
              map = new google.maps.Map(document.getElementById("map"), {
                  center: { lat: 28.63556, lng: 77.09053 }, // Default center
                  zoom: 3,
              });
          }

          function displayMaxCallLocationData(data) {
              const cleanedDataTable = document.getElementById("cleaned-data");
              cleanedDataTable.innerHTML = "";

              if (data.length > 0) {
                  const firstCellIdIndex = data[0].indexOf("First Cell ID");

                  if (firstCellIdIndex !== -1) {
                      const firstCellIdCount = data.slice(1).reduce((acc, row) => {
                          const firstCellId = row[firstCellIdIndex];
                          if (firstCellId) {
                              if (!acc[firstCellId]) {
                                  acc[firstCellId] = 0;
                              }
                              acc[firstCellId]++;
                          }
                          return acc;
                      }, {});

                      const sortedFirstCellIdCount = Object.entries(
                          firstCellIdCount
                      ).sort((a, b) => b[1] - a[1]);

                      // Create a container div for the table
                      const tableContainer = document.createElement("div");
                      tableContainer.style.maxHeight = "400px"; // Set a fixed height for the container
                      tableContainer.style.overflowY = "auto"; // Enable vertical scrolling

                      const table = document.createElement("table");
                      const headerRow = document.createElement("tr");
                      const th1 = document.createElement("th");
                      th1.textContent = "First Cell ID";
                      headerRow.appendChild(th1);
                      const th2 = document.createElement("th");
                      th2.textContent = "Count";
                      headerRow.appendChild(th2);
                      table.appendChild(headerRow);

                      sortedFirstCellIdCount.forEach(([firstCellId, count], index) => {
                          const rowElem = document.createElement("tr");
                          const td1 = document.createElement("td");
                          td1.textContent = firstCellId;
                          rowElem.appendChild(td1);
                          const td2 = document.createElement("td");
                          td2.textContent = count;
                          rowElem.appendChild(td2);
                          table.appendChild(rowElem);

                          const [lat, lng] = firstCellId.split("/").map(Number);
                          if (!isNaN(lat) && !isNaN(lng)) {
                              const location = { lat: lat, lng: lng };
                              const marker = new google.maps.Marker({
                                  position: location,
                                  map: map,
                                  title: firstCellId,
                                  label: (index + 1).toString(),
                              });
                              markers.push(marker);
                          }

                          rowElem.addEventListener("mouseenter", () => {
                              if (activeMarker) {
                                  activeMarker.setIcon(null);
                              }
                              const icon = {
                                  url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                                  scaledSize: new google.maps.Size(40, 40), // Increase the size of the icon
                              };
                              marker.setIcon(icon);
                              marker.setZIndex(1); // Set a higher zIndex to bring the marker to the front
                              activeMarker = marker;
                              map.setZoom(10);
                              map.setCenter(marker.getPosition());
                          });

                          rowElem.addEventListener("mouseleave", () => {
                              marker.setIcon(null);
                              marker.setZIndex(0); // Reset the zIndex to default
                          });
                      });

                      // Append the table to the container div
                      tableContainer.appendChild(table);

                      // Append the container div to the cleanedDataTable
                      cleanedDataTable.appendChild(tableContainer);

                      // Create a "Distance" button outside the table container
                      const distanceButton = document.createElement("button");
                      distanceButton.textContent = "Show Distance";
                      distanceButton.id = "distance-button"; // Add an ID to the button
                      distanceButton.addEventListener("click", showDistanceLines);
                      cleanedDataTable.appendChild(distanceButton);

                      // Create an "Animation" button outside the table container
                      const animationButton = document.createElement("button");
                      animationButton.textContent = "Show Animation";
                      animationButton.id = "animation-button"; // Add an ID to the button
                      animationButton.addEventListener("click", toggleAnimation);
                      cleanedDataTable.appendChild(animationButton);

                      if (activeSubTab === "Call Max Location") {
                          document.getElementById("map").style.display = "block";
                          const bounds = new google.maps.LatLngBounds();
                          markers.forEach((marker) => bounds.extend(marker.getPosition()));
                          map.fitBounds(bounds);
                      } else {
                          document.getElementById("map").style.display = "none";
                      }
                  }
              }
          }

          function showDistanceLines() {
              if (polyline) {
                  polyline.setMap(null);
                  distanceLabels.forEach((label) => label.setMap(null));
                  distanceLabels.length = 0;
              }

              const path = markers.map((marker) => marker.getPosition());
              polyline = new google.maps.Polyline({
                  path: path,
                  strokeColor: "#FF0000",
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                  map: map,
              });

              for (let i = 0; i < path.length - 1; i++) {
                  const distance =
                      google.maps.geometry.spherical.computeDistanceBetween(
                          path[i],
                          path[i + 1]
                      );
                  const distanceKm = (distance / 1000).toFixed(2);

                  const midpoint = google.maps.geometry.spherical.interpolate(
                      path[i],
                      path[i + 1],
                      0.5
                  );
                  const label = new google.maps.Marker({
                      position: midpoint,
                      icon: {
                          url:
                              "data:image/svg+xml;charset=UTF-8," +
                              encodeURIComponent(`
                                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20">
                                    <rect width="50" height="20" fill="white" stroke="black" stroke-width="2"/>
                                    <text x="25" y="15" font-size="12" text-anchor="middle" fill="black">${distanceKm} km</text>
                                  </svg>
                                `),
                          anchor: new google.maps.Point(25, 10),
                      },
                      map: map,
                  });
                  distanceLabels.push(label);
              }
              this.textContent = "Hide Distance";
              this.removeEventListener("click", showDistanceLines);
              this.addEventListener("click", hideDistanceLines);
          }

          function hideDistanceLines() {
              if (polyline) {
                  polyline.setMap(null);
                  distanceLabels.forEach((label) => label.setMap(null));
                  distanceLabels.length = 0;
                  polyline = null;
              }
              this.textContent = "Show Distance";
              this.removeEventListener("click", hideDistanceLines);
              this.addEventListener("click", showDistanceLines);
          }

          function toggleAnimation() {
              if (animationIntervalId) {
                  stopAnimation();
                  this.textContent = "Show Animation";
              } else {
                  startAnimation();
                  this.textContent = "Stop Animation";
              }
          }

          function startAnimation() {
              if (polyline) {
                  polyline.setMap(null);
              }
              polyline = new google.maps.Polyline({
                  path: [],
                  strokeColor: "#FF0000",
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                  map: map,
              });

              const directionsService = new google.maps.DirectionsService();
              const path = markers.map((marker) => marker.getPosition());

              async function calculateRoute(index) {
                  if (index >= path.length - 1) {
                      return [];
                  }

                  const request = {
                      origin: path[index],
                      destination: path[index + 1],
                      travelMode: "DRIVING",
                  };

                  return new Promise((resolve, reject) => {
                      directionsService.route(request, function (result, status) {
                          if (status === "OK") {
                              const route = result.routes[0].overview_path;
                              calculateRoute(index + 1)
                                  .then((nextRoute) => {
                                      resolve(route.concat(nextRoute));
                                  })
                                  .catch(reject);
                          } else {
                              reject(status);
                          }
                      });
                  });
              }

              function animateRoute(route, index = 0) {
                  if (index >= route.length - 1) {
                      return; // No more segments to animate
                  }

                  const startPoint = route[index];
                  const endPoint = route[index + 1];
                  const distance =
                      google.maps.geometry.spherical.computeDistanceBetween(
                          startPoint,
                          endPoint
                      );
                  const duration = Math.min(distance / 30, 1000); // Adjust the divisor as needed
                  const numSteps = 2; // Number of steps between each marker

                  polyline.getPath().push(startPoint); // Add the start point to the polyline path

                  let step = 0;
                  const animateStep = () => {
                      if (step < numSteps) {
                          const t = step / numSteps;
                          const point = google.maps.geometry.spherical.interpolate(
                              startPoint,
                              endPoint,
                              t
                          );
                          polyline.getPath().setAt(polyline.getPath().length - 1, point); // Update the last point in the polyline path

                          // Add animation effect
                          const lineSymbol = {
                              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                              scale: 3,
                              strokeColor: "#FF0000",
                          };
                          polyline.setOptions({
                              icons: [
                                  {
                                      icon: lineSymbol,
                                      offset: "100%",
                                  },
                              ],
                          });

                          step++;
                          requestAnimationFrame(animateStep);
                      } else {
                          animateRoute(route, index + 1); // Animate the next segment
                      }
                  };

                  requestAnimationFrame(animateStep);
              }

              calculateRoute(0)
                  .then((route) => {
                      animateRoute(route);
                  })
                  .catch((error) => {
                      console.error("Error calculating route:", error);
                  });
          }

          function stopAnimation() {
              if (animationIntervalId) {
                  clearInterval(animationIntervalId);
                  animationIntervalId = null;
              }
              if (polyline) {
                  polyline.setMap(null);
                  polyline = null;
              }
          }

          const cache = {};

          async function fetchSMSData(uniqueSMS) {
              try {
                  // Check if uniqueSMS is exactly 6 characters long
                  if (uniqueSMS.length !== 6) {
                  }

                  // Check if data for uniqueSMS is already in cache
                  if (cache[uniqueSMS]) {
                      return cache[uniqueSMS];
                  }

                  const response = await fetch(
                      `https://investigationcamp.com/sms_header.php?header=${uniqueSMS}`
                  );
                  const data = await response.json();

                  // Validate the data format
                  if (
                      !Array.isArray(data) ||
                      typeof data[0] !== "object" ||
                      !data[0].Entity_Name ||
                      !data[0].Purpose
                  ) {
                  }

                  // Store the data in cache
                  cache[uniqueSMS] = data;

                  return data;
              } catch (error) {
                  return [];
              }
          }

          async function displaySMSAnalysisData(data) {
              cleanedDataTable.innerHTML = "";

              if (data.length > 0) {
                  const bPartyIndex = data[0].indexOf("B Party");

                  if (bPartyIndex !== -1) {
                      const smsAnalysisCount = data.slice(1).reduce((acc, row) => {
                          const bParty = row[bPartyIndex];
                          if (bParty && (bParty.length < 10 || /[^0-9]/.test(bParty))) {
                              if (!acc[bParty]) {
                                  acc[bParty] = 0;
                              }
                              acc[bParty]++;
                          }
                          return acc;
                      }, {});

                      const sortedSMSAnalysisCount = Object.entries(
                          smsAnalysisCount
                      ).sort((a, b) => b[1] - a[1]);

                      const tableContainer = document.createElement("div");
                      tableContainer.style.display = "flex";

                      const table1 = document.createElement("table");
                      const headerRow1 = document.createElement("tr");
                      const th1 = document.createElement("th");
                      th1.textContent = "B Party";
                      headerRow1.appendChild(th1);
                      const th2 = document.createElement("th");
                      th2.textContent = "Count";
                      headerRow1.appendChild(th2);
                      table1.appendChild(headerRow1);

                      sortedSMSAnalysisCount.forEach(([bParty, count]) => {
                          const rowElem = document.createElement("tr");
                          const td1 = document.createElement("td");
                          td1.textContent = bParty;
                          rowElem.appendChild(td1);
                          const td2 = document.createElement("td");
                          td2.textContent = count;
                          rowElem.appendChild(td2);
                          table1.appendChild(rowElem);
                      });

                      tableContainer.appendChild(table1);

                      const uniqueSMSCount = {};
                      sortedSMSAnalysisCount.forEach(([bParty, count]) => {
                          const uniqueSMS = bParty.split("-")[1] || bParty;
                          if (!uniqueSMSCount[uniqueSMS]) {
                              uniqueSMSCount[uniqueSMS] = 0;
                          }
                          uniqueSMSCount[uniqueSMS] += count;
                      });

                      const table2 = document.createElement("table");
                      const headerRow2 = document.createElement("tr");
                      const th3 = document.createElement("th");
                      th3.textContent = "Unique_SMS";
                      headerRow2.appendChild(th3);
                      const th4 = document.createElement("th");
                      th4.textContent = "U_Count";
                      headerRow2.appendChild(th4);
                      const th5 = document.createElement("th");
                      th5.textContent = "Entity_Name";
                      headerRow2.appendChild(th5);
                      const th6 = document.createElement("th");
                      th6.textContent = "Purpose";
                      headerRow2.appendChild(th6);
                      table2.appendChild(headerRow2);

                      const uniqueSMSData = await Promise.all(
                          Object.entries(uniqueSMSCount).map(async ([uniqueSMS, count]) => {
                              try {
                                  const data = await fetchSMSData(uniqueSMS);
                                  const [item] = data;
                                  const { Entity_Name = "", Purpose = "" } = item || {};
                                  return { uniqueSMS, count, Entity_Name, Purpose };
                              } catch (error) {
                                  return {
                                      uniqueSMS,
                                      count,
                                      Entity_Name: "Error",
                                      Purpose: "Error",
                                  };
                              }
                          })
                      );

                      const sortedUniqueSMSData = uniqueSMSData.sort(
                          (a, b) => b.count - a.count
                      );

                      sortedUniqueSMSData.forEach(
                          ({ uniqueSMS, count, Entity_Name, Purpose }) => {
                              const rowElem = document.createElement("tr");
                              const td1 = document.createElement("td");
                              td1.textContent = uniqueSMS;
                              rowElem.appendChild(td1);
                              const td2 = document.createElement("td");
                              td2.textContent = count;
                              rowElem.appendChild(td2);
                              const td3 = document.createElement("td");
                              td3.textContent = Entity_Name;
                              rowElem.appendChild(td3);
                              const td4 = document.createElement("td");
                              td4.textContent = Purpose;
                              rowElem.appendChild(td4);
                              table2.appendChild(rowElem);
                          }
                      );

                      tableContainer.appendChild(table2);
                      cleanedDataTable.appendChild(tableContainer);
                  }
              }
              document.getElementById("map").style.display = "none";
          }

          function showRadioButtons() {
              const radioButtonsContainer = document.querySelector(
                  ".radio-buttons-container"
              );
              if (radioButtonsContainer) {
                  radioButtonsContainer.style.display = "flex";
              } else {
                  createRadioButtons();
              }
          }

          function createRadioButtons() {
              const container = document.createElement("div");
              container.className = "radio-buttons-container";
              container.style.display = "flex";

              container.innerHTML = `
                            <label><input type="radio" name="bPartyFilter" value="mobile" checked> Mobile</label>
                            <label><input type="radio" name="bPartyFilter" value="string"> String</label>
                            <label><input type="radio" name="bPartyFilter" value="all"> All</label>
                          `;

              // Insert the container above the table
              const tableContainer = document.getElementById("table-data");
              tableContainer.parentNode.insertBefore(container, tableContainer);

              // Add event listeners to radio buttons
              document
                  .querySelectorAll('input[name="bPartyFilter"]')
                  .forEach((radio) => {
                      radio.addEventListener("change", displayCommonBPartyData);
                  });
          }

          async function displayCommonBPartyData() {
              let filterType = "mobile";
              const selectedRadio = document.querySelector(
                  'input[name="bPartyFilter"]:checked'
              );
              if (selectedRadio) {
                  filterType = selectedRadio.value;
              }

              const bPartyData = {};

              Object.keys(allData).forEach((fileName) => {
                  const data = allData[fileName];
                  const bPartyIndex = data[0].indexOf("B Party");

                  if (bPartyIndex !== -1) {
                      data.slice(1).forEach((row) => {
                          const bParty = row[bPartyIndex];
                          if (bParty) {
                              if (!bPartyData[bParty]) {
                                  bPartyData[bParty] = {};
                              }
                              bPartyData[bParty][fileName] = true;
                          }
                      });
                  }
              });

              const commonBParties = Object.keys(bPartyData).filter((bParty) => {
                  const files = Object.keys(bPartyData[bParty]);
                  return files.length > 1;
              });

              const tableData = commonBParties
                  .map((bParty) => {
                      const isMobile = /^[6-9][0-9]{9}$/.test(bParty);
                      const isString = /[^0-9]/.test(bParty);

                      if (
                          (filterType === "mobile" && isMobile) ||
                          (filterType === "string" && isString) ||
                          filterType === "all"
                      ) {
                          const commonTargets = Object.keys(allData)
                              .filter((fileName) => bPartyData[bParty][fileName])
                              .map((fileName) => tabNames[fileName])
                              .join(", ");
                          return [bParty, commonTargets];
                      }
                      return null;
                  })
                  .filter((row) => row !== null);

              displayTable(tableData);

              return tableData;
          }

          function downloadTableAsExcel() {
              const table = document.getElementById("cleaned-data");
              const ws = XLSX.utils.table_to_sheet(table);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "CDR Data");
              XLSX.writeFile(wb, "cdr_data.xlsx");
          }

          function cloneTableWithoutBubbles(table) {
              const clone = table.cloneNode(true);
              const bubbles = clone.querySelectorAll(".common-bubble");
              bubbles.forEach((bubble) => bubble.remove());
              return clone;
          }

          function displayCommonIMEIData() {
              cleanedDataTable.innerHTML = "";

              const imeiData = {};

              // Gather IMEIs and their Target Numbers
              Object.keys(allData).forEach((fileName) => {
                  const data = allData[fileName];
                  const imeiIndex = data[0].indexOf("IMEI");
                  const targetNumberIndex = data[0].indexOf("Target No");

                  if (imeiIndex !== -1 && targetNumberIndex !== -1) {
                      data.slice(1).forEach((row) => {
                          const imei = row[imeiIndex];
                          const targetNumber = row[targetNumberIndex];
                          if (imei && targetNumber) {
                              if (!imeiData[imei]) {
                                  imeiData[imei] = new Set();
                              }
                              imeiData[imei].add(targetNumber);
                          }
                      });
                  }
              });

              // Create header row
              const headerRow = document.createElement("tr");
              const headers = [
                  "IMEI",
                  "Target Numbers",
                  "First Call",
                  "First Call B Party",
                  "Last Call",
                  "Last Call B Party",
              ];
              headers.forEach((h) => {
                  const th = document.createElement("th");
                  th.textContent = h;
                  headerRow.appendChild(th);
              });
              cleanedDataTable.appendChild(headerRow);

              // Process each IMEI with at least 2 target numbers
              Object.entries(imeiData)
                  .filter(([_, targets]) => targets.size >= 2)
                  .forEach(([imei, targetNumbers]) => {
                      const targetArray = Array.from(targetNumbers);

                      const imeiCellData = imei; // IMEI displayed once

                      const targetLines = [];
                      const firstCallLines = [];
                      const firstCallBPartyLines = [];
                      const lastCallLines = [];
                      const lastCallBPartyLines = [];

                      let earliestAllDatetime = null;
                      let earliestAllIndex = -1;

                      let latestAllDatetime = null;
                      let latestAllIndex = -1;

                      targetArray.forEach((tNumber, index) => {
                          let calls = [];

                          // Gather calls for this IMEI and target number
                          Object.keys(allData).forEach((fileName) => {
                              const data = allData[fileName];
                              const imeiIndex = data[0].indexOf("IMEI");
                              const targetNumberIndex = data[0].indexOf("Target No");
                              const dateIndex = data[0].indexOf("Date");
                              const timeIndex = data[0].indexOf("Time");
                              const bPartyIndex = data[0].indexOf("B Party");

                              if (
                                  [
                                      imeiIndex,
                                      targetNumberIndex,
                                      dateIndex,
                                      timeIndex,
                                      bPartyIndex,
                                  ].includes(-1)
                              )
                                  return;

                              data.slice(1).forEach((row) => {
                                  const rowIMEI = row[imeiIndex];
                                  const rowTarget = row[targetNumberIndex];
                                  if (rowIMEI === imei && rowTarget === tNumber) {
                                      const rowDate = row[dateIndex];
                                      const rowTime = row[timeIndex];
                                      const rowBParty = row[bPartyIndex];

                                      // Parse date/time as DD/MM/YYYY
                                      const [dayStr, monthStr, yearStr] = rowDate.split("/");
                                      const day = parseInt(dayStr, 10);
                                      const month = parseInt(monthStr, 10) - 1; // month is 0-based
                                      const year = parseInt(yearStr, 10);

                                      const [hoursStr, minutesStr, secondsStr] =
                                          rowTime.split(":");
                                      const hours = parseInt(hoursStr, 10);
                                      const minutes = parseInt(minutesStr, 10);
                                      const seconds = parseInt(secondsStr, 10);

                                      const callDate = new Date(
                                          year,
                                          month,
                                          day,
                                          hours,
                                          minutes,
                                          seconds
                                      );

                                      calls.push({
                                          target: tNumber,
                                          date: rowDate,
                                          time: rowTime,
                                          datetime: callDate,
                                          bParty: rowBParty,
                                      });
                                  }
                              });
                          });

                          calls.sort((a, b) => a.datetime - b.datetime);

                          if (calls.length === 0) {
                              targetLines.push(tNumber);
                              firstCallLines.push("No Calls");
                              firstCallBPartyLines.push("No BParty");
                              lastCallLines.push("No Calls");
                              lastCallBPartyLines.push("No BParty");
                              return;
                          }

                          const earliestCall = calls[0];
                          const latestCall = calls[calls.length - 1];

                          targetLines.push(tNumber);
                          firstCallLines.push(`${earliestCall.date} ${earliestCall.time}`);
                          firstCallBPartyLines.push(earliestCall.bParty || "");
                          lastCallLines.push(`${latestCall.date} ${latestCall.time}`);
                          lastCallBPartyLines.push(latestCall.bParty || "");

                          // Update global earliest
                          if (
                              earliestAllDatetime === null ||
                              earliestCall.datetime < earliestAllDatetime
                          ) {
                              earliestAllDatetime = earliestCall.datetime;
                              earliestAllIndex = index;
                          }

                          // Update global latest
                          if (
                              latestAllDatetime === null ||
                              latestCall.datetime > latestAllDatetime
                          ) {
                              latestAllDatetime = latestCall.datetime;
                              latestAllIndex = index;
                          }
                      });

                      // Highlight earliest and latest lines
                      if (earliestAllIndex !== -1) {
                          firstCallLines[earliestAllIndex] = wrapRedBold(
                              firstCallLines[earliestAllIndex]
                          );
                          firstCallBPartyLines[earliestAllIndex] = wrapRedBold(
                              firstCallBPartyLines[earliestAllIndex]
                          );
                      }

                      if (latestAllIndex !== -1) {
                          lastCallLines[latestAllIndex] = wrapRedBold(
                              lastCallLines[latestAllIndex]
                          );
                          lastCallBPartyLines[latestAllIndex] = wrapRedBold(
                              lastCallBPartyLines[latestAllIndex]
                          );
                      }

                      const targetCellData = targetLines.join("\n");
                      const firstCallCellData = firstCallLines.join("\n");
                      const firstCallBPartyCellData = firstCallBPartyLines.join("\n");
                      const lastCallCellData = lastCallLines.join("\n");
                      const lastCallBPartyCellData = lastCallBPartyLines.join("\n");

                      const rowElem = document.createElement("tr");

                      function createCell(html) {
                          const td = document.createElement("td");
                          td.innerHTML = html;
                          td.style.whiteSpace = "pre";
                          return td;
                      }

                      rowElem.appendChild(createCell(imeiCellData));
                      rowElem.appendChild(createCell(targetCellData));
                      rowElem.appendChild(createCell(firstCallCellData));
                      rowElem.appendChild(createCell(firstCallBPartyCellData));
                      rowElem.appendChild(createCell(lastCallCellData));
                      rowElem.appendChild(createCell(lastCallBPartyCellData));

                      cleanedDataTable.appendChild(rowElem);
                  });

              function wrapRedBold(text) {
                  return `<span style="color:red; font-weight:bold;">${text}</span>`;
              }
          }

          function copyTableToClipboard() {
              const table = document.getElementById("cleaned-data");

              // Create a temporary div to hold our cloned table
              const tempDiv = document.createElement("div");
              tempDiv.style.position = "absolute";
              tempDiv.style.left = "-9999px";
              document.body.appendChild(tempDiv);

              // Clone the table and remove bubbles
              const clonedTable = table.cloneNode(true);
              const bubbles = clonedTable.querySelectorAll(".common-bubble");
              bubbles.forEach((bubble) => bubble.remove());

              // Append the cloned table to our temporary div
              tempDiv.appendChild(clonedTable);

              // Select the temporary div
              const range = document.createRange();
              range.selectNode(tempDiv);

              const selection = window.getSelection();
              selection.removeAllRanges();
              selection.addRange(range);

              // Copy and cleanup
              document.execCommand("copy");
              selection.removeAllRanges();
              document.body.removeChild(tempDiv);

              alert("Table copied to clipboard (without bubbles)!");
          }

          const style = document.createElement("style");
          style.textContent = `
                    .fixed-header {
                      position: sticky;
                      top: 0;
                      background-color: #f1f1f1;
                      z-index: 1000;
                    }
                    .fixed-controls {
                      position: sticky;
                      top: 0;
                      background-color: #f1f1f1;
                      z-index: 1001;
                      padding: 10px 0;
                    }
                    #table-container {
                      max-height: calc(100vh - 100px);
                      overflow-y: auto;
                    }
                  `;
          document.head.appendChild(style);

          function displayInvTblData() {
              cleanedDataTable.innerHTML = "";

              // Create a container for fixed controls
              const fixedControlsDiv = document.createElement("div");
              fixedControlsDiv.className = "fixed-controls";

              // Create input fields and buttons
              const controlsDiv = document.createElement("div");
              controlsDiv.innerHTML = `
                      <label for="bPartyCount">B Party Count: </label>
                      <input type="number" id="bPartyCount" value="10" min="1">
                      <label for="cellIdCount">Cell ID Count: </label>
                      <input type="number" id="cellIdCount" value="10" min="1">
                      <label for="imeiCount">IMEI Count: </label>
                      <input type="number" id="imeiCount" value="10" min="1">
                      <button onclick="updateInvTblData()">Update</button>
                      <button onclick="downloadTableAsExcel()">?? Download Excel</button>
                      <button onclick="copyTableToClipboard()">?? Copy Table</button>
                    `;
              fixedControlsDiv.appendChild(controlsDiv);
              cleanedDataTable.appendChild(fixedControlsDiv);

              // Create a container for the table
              const tableContainer = document.createElement("div");
              tableContainer.id = "table-container";
              cleanedDataTable.appendChild(tableContainer);

              const table = document.createElement("table");
              table.id = "inv-tbl";
              table.style.width = "100%";
              table.style.borderCollapse = "collapse";

              const headerRow = document.createElement("tr");
              headerRow.className = "fixed-header";
              const headers = [
                  "SNO",
                  "Mobile No",
                  "CAF",
                  "IMEI",
                  "B Party",
                  "Call Max Location",
                  "REFERENSE",
              ];
              headers.forEach((header) => {
                  const th = document.createElement("th");
                  th.textContent = header;
                  th.style.padding = "5px";
                  th.style.border = "1px solid black";
                  headerRow.appendChild(th);
              });
              table.appendChild(headerRow);

              tableContainer.appendChild(table);
              updateInvTblData();
          }

          function updateInvTblData() {
              const bPartyCount = parseInt(
                  document.getElementById("bPartyCount").value
              );
              const cellIdCount = parseInt(
                  document.getElementById("cellIdCount").value
              );
              const imeiCount = parseInt(document.getElementById("imeiCount").value);

              const table = document.getElementById("inv-tbl");
              // Remove existing data rows
              while (table.rows.length > 1) {
                  table.deleteRow(-1);
              }

              // Object to store common values and their occurrences
              const commonValues = { imei: {}, bParty: {}, cellId: {} };

              let sno = 1;
              const tableData = [];

              Object.keys(allData).forEach((fileName) => {
                  const data = allData[fileName];
                  const targetNumberIndex = data[0].indexOf("Target No");
                  const imeiIndex = data[0].indexOf("IMEI");
                  const bPartyIndex = data[0].indexOf("B Party");
                  const firstCellIdIndex = data[0].indexOf("First Cell ID");

                  if (targetNumberIndex !== -1) {
                      const targetNumber = data[1][targetNumberIndex];

                      // Get IMEIs for the target number
                      const imeis = new Set();
                      data.slice(1).forEach((row) => {
                          if (row[imeiIndex]) {
                              imeis.add(row[imeiIndex]);
                          }
                      });
                      const imeiList = Array.from(imeis).slice(0, imeiCount);

                      // Get top B Party mobile numbers
                      const bPartyData = {};
                      data.slice(1).forEach((row) => {
                          const bParty = row[bPartyIndex];
                          if (bParty && /^[6-9]\d{9}$/.test(bParty)) {
                              bPartyData[bParty] = (bPartyData[bParty] || 0) + 1;
                          }
                      });
                      const topBParty = Object.entries(bPartyData)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, bPartyCount)
                          .map(([number]) => number);

                      // Get top Cell IDs
                      const cellIdData = {};
                      data.slice(1).forEach((row) => {
                          const cellId = row[firstCellIdIndex];
                          if (cellId) {
                              cellIdData[cellId] = (cellIdData[cellId] || 0) + 1;
                          }
                      });
                      const topCellId = Object.entries(cellIdData)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, cellIdCount)
                          .map(([cellId]) => cellId);

                      tableData.push({
                          sno: sno++,
                          targetNumber,
                          imeiList,
                          topBParty,
                          topCellId,
                      });
                  }
              });

              // Identify common values within the current table data
              tableData.forEach((row) => {
                  row.imeiList.forEach((imei) => {
                      if (!commonValues.imei[imei]) commonValues.imei[imei] = [];
                      commonValues.imei[imei].push(row.sno);
                  });
                  row.topBParty.forEach((bParty) => {
                      if (!commonValues.bParty[bParty]) commonValues.bParty[bParty] = [];
                      commonValues.bParty[bParty].push(row.sno);
                  });
                  row.topCellId.forEach((cellId) => {
                      if (!commonValues.cellId[cellId]) commonValues.cellId[cellId] = [];
                      commonValues.cellId[cellId].push(row.sno);
                  });
              });

              // Populate the table
              tableData.forEach((rowData) => {
                  const row = table.insertRow();
                  [
                      rowData.sno,
                      rowData.targetNumber,
                      "",
                      rowData.imeiList,
                      rowData.topBParty,
                      rowData.topCellId,
                      "",
                  ].forEach((cellData, index) => {
                      const cell = row.insertCell();
                      cell.style.whiteSpace = "pre-wrap";
                      cell.style.padding = "5px";
                      cell.style.border = "1px solid black";
                      if (index === 0) {
                          cell.style.textAlign = "center";
                      }

                      // Handle IMEI, B Party, and Call Max Location columns
                      if (index === 3 || index === 4 || index === 5) {
                          const values = Array.isArray(cellData) ? cellData : [cellData];
                          const container = document.createElement("div");
                          values.forEach((value) => {
                              const valueSpan = document.createElement("span");
                              valueSpan.textContent = value;
                              container.appendChild(valueSpan);

                              const snoList =
                                  commonValues[
                                  index === 3 ? "imei" : index === 4 ? "bParty" : "cellId"
                                  ][value];
                              if (snoList && snoList.length > 1) {
                                  const bubble = createBubble(
                                      value,
                                      index === 3 ? "imei" : index === 4 ? "bParty" : "cellId",
                                      snoList,
                                      rowData.sno
                                  );
                                  container.appendChild(bubble);
                              }
                              container.appendChild(document.createElement("br"));
                          });
                          cell.appendChild(container);
                      } else {
                          cell.textContent = cellData;
                      }

                      cell.contentEditable = true;
                  });
              });

              // Add CSS for bubble animation
              const style = document.createElement("style");
              style.textContent = `
                      @keyframes bubble-pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                      }
                      .common-bubble {
                        animation: bubble-pulse 2s infinite;
                      }
                    `;
              document.head.appendChild(style);
          }

          function createBubble(value, type, snoList, currentSNO) {
              const bubble = document.createElement("span");
              bubble.className = "common-bubble";

              const otherSNOs = snoList.filter((sno) => sno !== currentSNO);

              const commonCount = otherSNOs.length;
              if (commonCount > 100) {
                  bubble.textContent = "100+";
              } else if (commonCount > 50) {
                  bubble.textContent = "50+";
              } else if (commonCount > 20) {
                  bubble.textContent = "20+";
              } else if (commonCount > 10) {
                  bubble.textContent = "10+";
              } else if (commonCount > 5) {
                  bubble.textContent = "5+";
              } else {
                  bubble.textContent = commonCount.toString();
              }

              const tooltip = document.createElement("div");
              tooltip.className = "tooltip";

              otherSNOs.forEach((sno) => {
                  const snoSpan = document.createElement("span");
                  snoSpan.textContent = sno;
                  snoSpan.className = "tooltip-sno";
                  snoSpan.onclick = (e) => {
                      e.stopPropagation();
                      tooltip.style.display = "none";
                      scrollToRow(parseInt(sno));
                  };
                  tooltip.appendChild(snoSpan);
              });

              bubble.appendChild(tooltip);

              const color = getColorForValue(value);
              bubble.style.backgroundColor = color;

              bubble.addEventListener("click", (e) => {
                  e.stopPropagation();
                  tooltip.style.display =
                      tooltip.style.display === "block" ? "none" : "block";
              });

              return bubble;
          }

          const styles = document.createElement("style");
          style.textContent = `
                      .common-bubble {
                          display: inline-flex;
                          align-items: center;
                          justify-content: center;
                          width: 24px;
                          height: 24px;
                          border-radius: 12px;
                          color: white;
                          font-size: 11px;
                          font-weight: bold;
                          margin-left: 5px;
                          cursor: pointer;
                          position: relative;
                          transition: all 0.3s ease;
                          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                      }

                      .common-bubble:hover {
                          transform: translateY(-2px);
                          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                      }

                      .tooltip {
                          display: none;
                          position: absolute;
                          background-color: #ffffff;
                          color: #333;
                          text-align: center;
                          border-radius: 8px;
                          padding: 10px;
                          z-index: 1000;
                          bottom: 130%;
                          left: 50%;
                          transform: translateX(-50%);
                          min-width: 120px;
                          max-height: 200px;
                          overflow-y: auto;
                          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
                          border: 1px solid #e0e0e0;
                      }

                      .tooltip-sno {
                          display: inline-block;
                          margin: 3px;
                          cursor: pointer;
                          padding: 4px 8px;
                          border-radius: 4px;
                          transition: background-color 0.2s;
                          font-size: 12px;
                      }

                      .tooltip-sno:hover {
                          background-color: #f0f0f0;
                      }

                      .common-bubble:hover .tooltip {
                          display: block;
                          animation: fadeIn 0.3s;
                      }

                      @keyframes fadeIn {
                          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
                          to { opacity: 1; transform: translateX(-50%) translateY(0); }
                      }
                  `;
          document.head.appendChild(styles);

          function getColorForValue(value) {
              if (!commonColors[value]) {
                  commonColors[value] = getRandomColor();
              }
              return commonColors[value];
          }

          function getRandomColor() {
              const letters = "0123456789ABCDEF";
              let color = "#";
              for (let i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
              }
              return color;
          }

          document.head.appendChild(styles);

          function scrollToRow(sno) {
              const table = document.getElementById("inv-tbl");
              const rows = table.getElementsByTagName("tr");
              for (let i = 1; i < rows.length; i++) {
                  if (parseInt(rows[i].cells[0].textContent) === sno) {
                      rows[i].scrollIntoView({ behavior: "smooth", block: "center" });
                      rows[i].style.backgroundColor = "yellow";
                      setTimeout(() => {
                          rows[i].style.backgroundColor = "";
                      }, 2000);
                      break;
                  }
              }
          }

          function hideRadioButtons() {
              const radioButtonsContainer = document.querySelector(
                  ".radio-buttons-container"
              );
              if (radioButtonsContainer) {
                  radioButtonsContainer.style.display = "none";
              }
          }

          document.getElementById("scroll-up").addEventListener("click", () => {
              const tableContainer = document.getElementById("table-container");
              tableContainer.scrollTo({ top: 0, behavior: "smooth" });
          });

          document.getElementById("scroll-down").addEventListener("click", () => {
              const tableContainer = document.getElementById("table-container");
              tableContainer.scrollTo({
                  top: tableContainer.scrollHeight,
                  behavior: "smooth",
              });
          });

          const tableContainer = document.getElementById("table-container");

          tableContainer.addEventListener("scroll", () => {
              if (
                  tableContainer.scrollTop + tableContainer.clientHeight >=
                  tableContainer.scrollHeight
              ) {
                  if (!isLoading) {
                      isLoading = true;
                      currentPage++;
                      fetchFileDataFromIndexedDB(activeTab)
                          .then((data) => {
                              if (activeSubTab === "CDR") {
                                  displayPageData(data, currentPage);
                              } else if (activeSubTab === "B Party") {
                                  displayBPartyData(data);
                              } else if (activeSubTab === "Max Duration") {
                                  displayMaxDurationData(data);
                              } else if (activeSubTab === "Max IMEI") {
                                  displayMaxIMEIData(data);
                              } else if (activeSubTab === "Max IMSI") {
                                  displayMaxIMSIData(data);
                              } else if (activeSubTab === "Call Max Location") {
                                  displayMaxCallLocationData(data);
                              } else if (activeSubTab === "SMS Analysis") {
                                  displaySMSAnalysisData(data);
                              } else if (activeSubTab === "Common B Party") {
                                  displayCommonBPartyData();
                              }
                              isLoading = false;
                          })
                          .catch((error) => {
                              console.error("Error fetching file data:", error);
                              isLoading = false;
                          });
                  }
              }
          });

          fileInput.addEventListener("change", async (event) => {
              const files = event.target.files;

              for (const file of files) {
                  if (file.name.toLowerCase().endsWith(".zip")) {
                      await processZipFile(file);
                  } else if (isValidFileExtension(file.name)) {
                      await processFile(file);
                  }
              }
          });

          function isValidFileExtension(fileName) {
              const validExtensions = [".csv", ".xls", ".xlsx"];
              return validExtensions.some((ext) =>
                  fileName.toLowerCase().endsWith(ext)
              );
          }

          // Extract password from filename
          function getPasswordFromFilename(filename) {
              const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
              const parts = nameWithoutExtension.split(/[ _-]/);
              return parts[0];
          }

          async function handleZipFile(blob, fileName) {
              // First try with derived password
              const password = getPasswordFromFilename(fileName);
              let entries = [];
              let reader;

              try {
                  reader = new zip.ZipReader(new zip.BlobReader(blob), { password });
                  entries = await reader.getEntries();
              } catch (e) {
                  // If password attempt fails, try without password
                  if (reader) await reader.close();

                  reader = new zip.ZipReader(new zip.BlobReader(blob));
                  entries = await reader.getEntries();
              }

              for (const entry of entries) {
                  if (entry.directory) continue;

                  if (entry.filename.toLowerCase().endsWith(".zip")) {
                      // Nested zip
                      const nestedBlob = await entry.getData(
                          new zip.BlobWriter("application/zip")
                      );
                      await handleZipFile(nestedBlob, entry.filename);
                  } else if (isValidFileExtension(entry.filename)) {
                      const textBlob = await entry.getData(
                          new zip.BlobWriter("text/plain")
                      );
                      const text = await textBlob.text();
                      await processFileData(entry.filename, text);
                  }
              }

              await reader.close();
          }

          async function processZipFile(file, parentFileName = "") {
              try {
                  await handleZipFile(file, file.name);
              } catch (error) {
                  console.error("Error processing ZIP file:", error);
              }
          }

          async function processFile(file) {
              try {
                  if (file.name.toLowerCase().endsWith(".csv")) {
                      // CSV ?? ??? ?????? ???
                      const fileData = await file.text();
                      await processFileData(file.name, fileData);
                  } else if (
                      file.name.toLowerCase().endsWith(".xlsx") ||
                      file.name.toLowerCase().endsWith(".xls")
                  ) {
                      // Excel ???? ?? ?????
                      const arrayBuffer = await file.arrayBuffer();
                      const workbook = XLSX.read(arrayBuffer, {
                          type: "array",
                          cellDates: true,
                      });

                      // ???? ??? ???
                      const sheetName = workbook.SheetNames[0];
                      const worksheet = workbook.Sheets[sheetName];

                      // ??? ?? CSV ???????? ??? ????????? ????, ???? ??????? ?? ???
                      const csvOptions = {
                          dateNF: "DD/MM/YYYY",
                          rawNumbers: false,
                          defval: "",
                      };

                      const csvString = XLSX.utils.sheet_to_csv(worksheet, csvOptions);

                      await processFileData(file.name, csvString);
                  }
              } catch (error) {
                  console.error("Error processing file:", error);
              }
          }

          const uploadedFiles = new Set();

          function isFileAlreadyUploaded(fileName) {
              return uploadedFiles.has(fileName);
          }

          function markFileAsUploaded(fileName) {
              uploadedFiles.add(fileName);
          }

          async function processFileData(fileName, fileData) {
              try {
                  if (isFileAlreadyUploaded(fileName)) {
                      return;
                  }

                  const { cleanedData, operator } = cleanCDRData(fileData, fileName);

                  if (
                      cleanedData.length <= 1 ||
                      (cleanedData.length === 2 &&
                          cleanedData[1].every((cell) => cell === "")) ||
                      (cleanedData.length > 1 &&
                          cleanedData.slice(1).every((row) => row[0] === "No Data Found"))
                  ) {
                      return; // ???? ?? ????? ???? ?? ??? ? ?????
                  }

                  allData[fileName] = cleanedData;
                  // ?????? ?? ???? ???? ?? ??? ??? ????
                  createTab(new File([fileData], fileName), cleanedData, operator);
                  markFileAsUploaded(fileName);
              } catch (error) {
                  console.error("Error processing file data:", error);
              }
          }

          async function exportActiveFileTab() {
              const wb = XLSX.utils.book_new();
              const subTabs = [
                  "CDR",
                  "B Party",
                  "Max Duration",
                  "Max IMEI",
                  "Max IMSI",
                  "Call Max Location",
                  "SMS Analysis",
                  "Common B Party",
                  "Mobile No. Brief",
                  "Common IMEI",
              ];

              const currentActiveSubTab = activeSubTab;
              const mapElement = document.getElementById("map");
              const mapDisplayStyle = mapElement.style.display;
              mapElement.style.display = "none";

              const progressDialog = createProgressDialog();

              for (let i = 0; i < subTabs.length; i++) {
                  const subTab = subTabs[i];
                  updateProgressDialog(
                      progressDialog,
                      `Processing ${subTab}...`,
                      ((i + 1) / subTabs.length) * 100
                  );

                  try {
                      const data = await fetchFileDataFromIndexedDB(activeTab);
                      const tableData = await processSubTabData(subTab, data);

                      if (tableData && tableData.length > 0) {
                          const ws = XLSX.utils.aoa_to_sheet(tableData);
                          formatWorksheet(ws, tableData);
                          XLSX.utils.book_append_sheet(wb, ws, subTab);
                      }
                  } catch (error) {
                      console.error(`Error processing ${subTab}:`, error);
                  }
              }

              const wopts = { bookType: "xlsx", bookSST: false, type: "binary" };
              XLSX.writeFile(wb, `${activeTab}_Data.xlsx`, wopts);

              document.body.removeChild(progressDialog);
              displaySubTabData(currentActiveSubTab);
              mapElement.style.display = mapDisplayStyle;
          }

          function createProgressDialog() {
              const dialog = document.createElement("div");
              dialog.style.position = "fixed";
              dialog.style.top = "50%";
              dialog.style.left = "50%";
              dialog.style.transform = "translate(-50%, -50%)";
              dialog.style.padding = "20px";
              dialog.style.background = "white";
              dialog.style.border = "1px solid black";
              dialog.style.zIndex = "1000";
              dialog.innerHTML =
                  '<h3>Exporting Data</h3><p id="progress-text"></p><progress id="progress-bar" value="0" max="100"></progress>';
              document.body.appendChild(dialog);
              return dialog;
          }

          function updateProgressDialog(dialog, text, percentage) {
              dialog.querySelector("#progress-text").textContent = text;
              dialog.querySelector("#progress-bar").value = percentage;
          }

          function formatWorksheet(ws, data) {
              if (!ws["!ref"]) return;

              const range = XLSX.utils.decode_range(ws["!ref"]);
              const colWidths = [];
              const merges = [];

              // Set column widths and apply styles
              for (let C = range.s.c; C <= range.e.c; ++C) {
                  let maxWidth = 0;
                  for (let R = range.s.r; R <= range.e.r; ++R) {
                      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                      const cell = ws[cellAddress];
                      if (!cell) continue;

                      // Convert all cells to string type
                      cell.t = "s";
                      cell.v = cell.v.toString();

                      // Apply styles
                      cell.s = getCellStyle(R, C, data);

                      // Update max width
                      const cellWidth = cell.v.length;
                      maxWidth = Math.max(maxWidth, cellWidth);
                  }
                  colWidths.push({ wch: Math.min(maxWidth + 2, 50) }); // Max width of 50
              }

              // Apply column widths
              ws["!cols"] = colWidths;

              // Add header row merge if necessary
              if (data[0] && data[0].length > 1) {
                  merges.push({
                      s: { r: 0, c: 0 },
                      e: { r: 0, c: data[0].length - 1 },
                  });
              }

              // Apply merges
              ws["!merges"] = merges;
          }

          function getCellStyle(row, col, data) {
              const baseStyle = {
                  font: { name: "Arial", sz: 11 },
                  alignment: {
                      vertical: "center",
                      horizontal: "center",
                      wrapText: true,
                  },
                  border: {
                      top: { style: "thin", color: { rgb: "000000" } },
                      bottom: { style: "thin", color: { rgb: "000000" } },
                      left: { style: "thin", color: { rgb: "000000" } },
                      right: { style: "thin", color: { rgb: "000000" } },
                  },
              };

              if (row === 0) {
                  // Header style
                  return {
                      ...baseStyle,
                      font: { ...baseStyle.font, bold: true, color: { rgb: "FFFFFF" } },
                      fill: { fgColor: { rgb: "4472C4" } },
                  };
              } else if (row % 2 === 0) {
                  // Even row style
                  return {
                      ...baseStyle,
                      fill: { fgColor: { rgb: "E9EFF7" } },
                  };
              } else {
                  // Odd row style
                  return baseStyle;
              }
          }

          async function processSubTabData(subTab, data) {
              switch (subTab) {
                  case "CDR":
                      return processDataForExcel(data);
                  case "B Party":
                      return processBPartyData(data);
                  case "Max Duration":
                      return processMaxDurationData(data);
                  case "Max IMEI":
                      return await processMaxIMEIData(data);
                  case "Max IMSI":
                      return processMaxIMSIData(data);
                  case "Call Max Location":
                      return processCallMaxLocationData(data);
                  case "SMS Analysis":
                      return await processSMSAnalysisData(data);
                  case "Common B Party":
                      return processCommonBPartyData(data);
                  case "Mobile No. Brief":
                      return processInvTblData(data);
                  case "Common IMEI":
                      return processCommonIMEIData(data);
                  default:
                      console.log("Unknown sub-tab:", subTab);
                      return null;
              }
          }

          function processDataForExcel(data) {
              const header = [`${activeTab} - CDR Data`];
              const subHeader = data[0];

              const processedData = data
                  .slice(1)
                  .map((row) =>
                      row.map((cell) =>
                          cell !== null && cell !== undefined ? cell.toString() : ""
                      )
                  );

              return [header, subHeader, ...processedData];
          }

          function processBPartyData(data) {
              const header = [`${activeTab} - B Party Analysis`];
              const subHeader = ["B Party", "Count", "Percentage"];

              const bPartyCounts = data.slice(1).reduce((acc, row) => {
                  const bParty = row[data[0].indexOf("B Party")];
                  acc[bParty] = (acc[bParty] || 0) + 1;
                  return acc;
              }, {});

              const totalCalls = Object.values(bPartyCounts).reduce(
                  (sum, count) => sum + count,
                  0
              );

              const processedData = Object.entries(bPartyCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([bParty, count]) => [
                      bParty,
                      count.toString(),
                      ((count / totalCalls) * 100).toFixed(2) + "%",
                  ]);

              return [header, subHeader, ...processedData];
          }

          function processMaxDurationData(data) {
              const header = [`${activeTab} - Max Duration Analysis`];
              const subHeader = [
                  "B Party",
                  "Total Duration",
                  "Call Count",
                  "Average Duration",
              ];

              const bPartyData = data.slice(1).reduce((acc, row) => {
                  const bParty = row[data[0].indexOf("B Party")];
                  const duration = parseFloat(row[data[0].indexOf("Duration")] || 0);
                  if (!acc[bParty]) {
                      acc[bParty] = { totalDuration: 0, callCount: 0 };
                  }
                  acc[bParty].totalDuration += duration;
                  acc[bParty].callCount += 1;
                  return acc;
              }, {});

              const processedData = Object.entries(bPartyData)
                  .sort((a, b) => b[1].totalDuration - a[1].totalDuration)
                  .map(([bParty, { totalDuration, callCount }]) => [
                      bParty,
                      totalDuration.toFixed(2),
                      callCount.toString(),
                      (totalDuration / callCount).toFixed(2),
                  ]);

              return [header, subHeader, ...processedData];
          }

          async function processMaxIMEIData(data) {
              const header = [`${activeTab} - Max IMEI Analysis`];
              const subHeader = ["IMEI", "Count", "Device Detail"];

              const imeiCounts = data.slice(1).reduce((acc, row) => {
                  const imei = row[data[0].indexOf("IMEI")];
                  acc[imei] = (acc[imei] || 0) + 1;
                  return acc;
              }, {});

              const processedData = await Promise.all(
                  Object.entries(imeiCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(async ([imei, count]) => {
                          const deviceDetail = await getDeviceDetail(imei.slice(0, 8));
                          return [imei, count.toString(), deviceDetail];
                      })
              );

              return [header, subHeader, ...processedData];
          }

          function processMaxIMSIData(data) {
              const header = [`${activeTab} - Max IMSI Analysis`];
              const subHeader = ["IMSI", "Count"];

              const imsiCounts = data.slice(1).reduce((acc, row) => {
                  const imsi = row[data[0].indexOf("IMSI")];
                  acc[imsi] = (acc[imsi] || 0) + 1;
                  return acc;
              }, {});

              const processedData = Object.entries(imsiCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([imsi, count]) => [imsi, count.toString()]);

              return [header, subHeader, ...processedData];
          }

          function processCallMaxLocationData(data) {
              const header = [`${activeTab} - Call Max Location Analysis`];
              const subHeader = ["Cell ID", "Count", "Latitude", "Longitude"];

              const cellIdCounts = data.slice(1).reduce((acc, row) => {
                  const cellId = row[data[0].indexOf("First Cell ID")];
                  acc[cellId] = (acc[cellId] || 0) + 1;
                  return acc;
              }, {});

              const processedData = Object.entries(cellIdCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cellId, count]) => {
                      const [lat, lng] = cellId.split("/");
                      return [cellId, count.toString(), lat, lng];
                  });

              return [header, subHeader, ...processedData];
          }

          async function processSMSAnalysisData(data) {
              const header = [`${activeTab} - SMS Analysis`];
              const subHeader = ["SMS Header", "Count", "Entity Name", "Purpose"];

              const smsHeaderCounts = data.slice(1).reduce((acc, row) => {
                  const smsHeader = row[data[0].indexOf("B Party")];
                  acc[smsHeader] = (acc[smsHeader] || 0) + 1;
                  return acc;
              }, {});

              const processedData = await Promise.all(
                  Object.entries(smsHeaderCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(async ([smsHeader, count]) => {
                          const smsData = await fetchSMSData(smsHeader);
                          return [
                              smsHeader,
                              count.toString(),
                              smsData.Entity_Name || "N/A",
                              smsData.Purpose || "N/A",
                          ];
                      })
              );

              return [header, subHeader, ...processedData];
          }
          function toggleDropdown() {
              document.getElementById("myDropdown").classList.toggle("show");
          }

          async function displayNetworkGraph() {
              const tableData = await displayCommonBPartyData();

              const nodesSet = new Set();
              const edgesArray = [];
              const targetNumbers = new Set(Object.values(tabNames));

              const connectionCount = {};

              tableData.forEach(([bParty, targetsString]) => {
                  const targets = targetsString.split(", ");
                  nodesSet.add(bParty);
                  connectionCount[bParty] =
                      (connectionCount[bParty] || 0) + targets.length;
                  targets.forEach((target) => {
                      nodesSet.add(target);
                      connectionCount[target] = (connectionCount[target] || 0) + 1;
                      edgesArray.push({ from: target, to: bParty });
                  });
              });

              const colorScale = d3
                  .scaleSequential(d3.interpolateViridis)
                  .domain([0, Math.max(...Object.values(connectionCount))]);

              const nodes = new vis.DataSet(
                  Array.from(nodesSet).map((id) => ({
                      id,
                      label: id,
                      color: targetNumbers.has(id)
                          ? "#FF0000"
                          : colorScale(connectionCount[id]),
                      shape: "dot",
                      size: 10 + Math.sqrt(connectionCount[id]) * 5,
                      font: {
                          size: 12 + Math.sqrt(connectionCount[id]),
                          face: "Tahoma",
                          color: "black",
                      },
                  }))
              );

              const edges = new vis.DataSet(
                  edgesArray.map((edge) => ({
                      ...edge,
                      color: {
                          color:
                              targetNumbers.has(edge.from) && targetNumbers.has(edge.to)
                                  ? "#FF0000"
                                  : "#999999",
                      },
                      width:
                          targetNumbers.has(edge.from) && targetNumbers.has(edge.to)
                              ? 2
                              : 0.5,
                  }))
              );

              const graphData = { nodes, edges };

              cleanedDataTable.innerHTML = `
          <div id="networkGraphContainer" style="position: relative; width: 100%; height: 1200px;">
            <button id="fullscreenToggle" style="position: absolute; z-index: 999; top: 10px; left: 10px;">Enter Fullscreen</button>
            <div id="networkGraph" style="height: 100%; width: 100%;"></div>
          </div>
        `;

              const container = document.getElementById("networkGraph");
              const options = {
                  layout: {
                      improvedLayout: false,
                  },
                  nodes: {
                      fixed: {
                          x: false,
                          y: false,
                      },
                  },
                  physics: {
                      enabled: true,
                      stabilization: false,
                      barnesHut: {
                          gravitationalConstant: -20000,
                          centralGravity: 0.3,
                          springLength: 100,
                          springConstant: 0.04,
                          damping: 0.09,
                          avoidOverlap: 1,
                      },
                      solver: "barnesHut",
                      maxVelocity: 50,
                      timestep: 0.5,
                      adaptiveTimestep: true,
                  },
                  interaction: {
                      dragNodes: true,
                      dragView: true,
                      hover: true,
                      multiselect: true,
                      selectable: true,
                  },
                  manipulation: {
                      enabled: false,
                  },
              };

              const network = new vis.Network(container, graphData, options);

              let isAnimating = false;
              let animationIntervals = [];

              // Animation effect on node click
              network.on("click", function (params) {
                  if (params.nodes.length > 0) {
                      const clickedNodeId = params.nodes[0];
                      const connectedEdges = network.getConnectedEdges(clickedNodeId);

                      if (isAnimating) {
                          // Stop animation and revert to original state
                          animationIntervals.forEach(clearInterval);
                          animationIntervals = [];
                          isAnimating = false;

                          edges.update(
                              edges.get().map((edge) => ({
                                  ...edge,
                                  color: {
                                      color:
                                          targetNumbers.has(edge.from) && targetNumbers.has(edge.to)
                                              ? "#FF0000"
                                              : "#999999",
                                  },
                                  dashes: false,
                                  width:
                                      targetNumbers.has(edge.from) && targetNumbers.has(edge.to)
                                          ? 2
                                          : 0.5,
                              }))
                          );
                      } else {
                          // Start animation
                          isAnimating = true;

                          connectedEdges.forEach((edgeId) => {
                              const edge = edges.get(edgeId);
                              if (
                                  !(targetNumbers.has(edge.from) && targetNumbers.has(edge.to))
                              ) {
                                  let dashOffset = 0;
                                  const intervalId = setInterval(() => {
                                      dashOffset += 1;
                                      edges.update({
                                          id: edgeId,
                                          dashes: [dashOffset % 40, 10],
                                          color: { color: "#00BFFF" },
                                          width: 2,
                                      });
                                  }, 100);

                                  animationIntervals.push(intervalId);
                              }
                          });
                      }
                  }
              });

              // Function to remove single-connected nodes (repeatedly until no single-connected node left)
              function removeSingleConnectedNodes() {
                  let removed = true;
                  while (removed) {
                      removed = false;
                      const allNodes = nodes.get();
                      for (let node of allNodes) {
                          const nodeEdges = network.getConnectedEdges(node.id);
                          if (nodeEdges.length === 1) {
                              // Remove this node and its single edge
                              edges.remove(nodeEdges[0]);
                              nodes.remove(node.id);
                              removed = true;
                          }
                      }
                  }
              }

              // Function to remove a node and its connections, then remove single-connected nodes
              function removeNodeAndSingleConnections(nodeId) {
                  const connectedEdges = network.getConnectedEdges(nodeId);
                  const connectedNodes = network.getConnectedNodes(nodeId);

                  // Remove the node
                  nodes.remove(nodeId);

                  // Remove edges of the removed node
                  edges.remove(connectedEdges);

                  // ?? ?? ??? ??? ?????-??????? ???? ????? ?????
                  removeSingleConnectedNodes();
              }

              // Triple-click to delete a node
              let clickCount = 0;
              let clickTimer = null;
              network.on("click", function (params) {
                  if (params.nodes.length > 0) {
                      clickCount++;
                      if (clickCount === 1) {
                          clickTimer = setTimeout(() => {
                              clickCount = 0;
                          }, 1000);
                      }
                      if (clickCount === 3) {
                          clearTimeout(clickTimer);
                          clickCount = 0;
                          const nodeToRemove = params.nodes[0];
                          if (nodeToRemove) {
                              removeNodeAndSingleConnections(nodeToRemove);
                          }
                      }
                  }
              });

              // Fix node position after dragging, but allow further dragging
              network.on("dragEnd", function (params) {
                  if (params.nodes.length > 0) {
                      const updates = params.nodes.map((nodeId) => {
                          const position = network.getPositions([nodeId])[nodeId];
                          return {
                              id: nodeId,
                              x: position.x,
                              y: position.y,
                              fixed: {
                                  x: true,
                                  y: true,
                              },
                          };
                      });
                      nodes.update(updates);
                  }
              });

              // Allow nodes to be dragged again
              network.on("dragStart", function (params) {
                  if (params.nodes.length > 0) {
                      const updates = params.nodes.map((nodeId) => ({
                          id: nodeId,
                          fixed: {
                              x: false,
                              y: false,
                          },
                      }));
                      nodes.update(updates);
                  }
              });

              // Zoom level fit on load
              network.once("stabilizationIterationsDone", function () {
                  network.fit({ animation: false });
              });

              // Fullscreen toggle functionality
              const toggleButton = document.getElementById("fullscreenToggle");
              let isFullscreen = false;

              toggleButton.addEventListener("click", () => {
                  const elem = document.getElementById("networkGraphContainer");
                  if (!isFullscreen) {
                      if (elem.requestFullscreen) {
                          elem.requestFullscreen();
                      } else if (elem.mozRequestFullScreen) {
                          elem.mozRequestFullScreen();
                      } else if (elem.webkitRequestFullscreen) {
                          elem.webkitRequestFullscreen();
                      } else if (elem.msRequestFullscreen) {
                          elem.msRequestFullscreen();
                      }
                      isFullscreen = true;
                      toggleButton.innerText = "Exit Fullscreen";
                  } else {
                      if (document.exitFullscreen) {
                          document.exitFullscreen();
                      } else if (document.mozCancelFullScreen) {
                          document.mozCancelFullScreen();
                      } else if (document.webkitExitFullscreen) {
                          document.webkitExitFullscreen();
                      } else if (document.msExitFullscreen) {
                          document.msExitFullscreen();
                      }
                      isFullscreen = false;
                      toggleButton.innerText = "Enter Fullscreen";
                  }
              });

              // Handle fullscreen change (optional, to keep button text in sync if user presses escape)
              // Fullscreen ????? ?? ??? ????? ?? ??? ?????
              document.addEventListener("fullscreenchange", () => {
                  const container = document.getElementById("networkGraphContainer");

                  if (document.fullscreenElement) {
                      // ??????????? ??? ??? ?????????? ?????
                      container.style.backgroundColor = "black";

                      // ????? ?? ???? ?????? ??? ????? ????
                      nodes.get().forEach((node) => {
                          nodes.update({
                              id: node.id,
                              font: { color: "white" }, // ????? ??? ????
                          });
                      });

                      // ?? ?? ??? ???? ????
                      edges.get().forEach((edge) => {
                          edges.update({
                              id: edge.id,
                              color: { color: "white" },
                          });
                      });
                  } else {
                      // ?????? ??? ??? ?????????? ???? ????
                      container.style.backgroundColor = "white";

                      // ????? ?? ???? ???????? ??? ??? ???? (??? ??? black)
                      nodes.get().forEach((node) => {
                          nodes.update({
                              id: node.id,
                              font: { color: "black" },
                          });
                      });

                      // ?? ???? ???????? ???? ?? ?? ?? ??? ?? ?????
                      edges.get().forEach((edge) => {
                          edges.update({
                              id: edge.id,
                              color: { color: "#999999" },
                          });
                      });
                  }
              });
          }

          function displayTable(tableData) {
              cleanedDataTable.innerHTML = "";
              if (tableData.length > 0) {
                  const headerRow = document.createElement("tr");
                  const th1 = document.createElement("th");
                  th1.textContent = "B Party";
                  headerRow.appendChild(th1);
                  const th2 = document.createElement("th");
                  th2.textContent = "Common Target Numbers";
                  headerRow.appendChild(th2);
                  cleanedDataTable.appendChild(headerRow);

                  tableData.forEach(([bParty, commonTargets]) => {
                      const rowElem = document.createElement("tr");
                      const td1 = document.createElement("td");
                      td1.textContent = bParty;
                      rowElem.appendChild(td1);
                      const td2 = document.createElement("td");
                      td2.textContent = commonTargets;
                      rowElem.appendChild(td2);
                      cleanedDataTable.appendChild(rowElem);
                  });
              } else {
                  cleanedDataTable.innerHTML =
                      "<p>??? ???? ?????? ???? ?? ?? ??? ???? ?? ?????? ???? ?????</p>";
              }
          }

          async function processCommonBPartyData() {
              const data = await fetchFileDataFromIndexedDB(activeTab);

              if (!data || data.length === 0) {
                  return [];
              }

              const bPartyIndex = data[0].indexOf("B Party");
              const targetNumberIndex = data[0].indexOf("Target No");

              if (bPartyIndex === -1 || targetNumberIndex === -1) {
                  return [];
              }

              const bPartyData = {};

              data.slice(1).forEach((row) => {
                  const bParty = row[bPartyIndex];
                  const targetNumber = row[targetNumberIndex];
                  if (bParty && targetNumber) {
                      if (!bPartyData[bParty]) {
                          bPartyData[bParty] = new Set();
                      }
                      bPartyData[bParty].add(targetNumber);
                  }
              });

              const result = Object.entries(bPartyData)
                  .filter(([_, targets]) => targets.size > 1)
                  .map(([bParty, targets]) => [bParty, Array.from(targets).join(", ")]);

              return result;
          }