 fetch("https://thingspeak.com/channels/2155544/field/2.json?results=10")
        .then((response) => response.json())
        .then((data) => {
          var temperatureData = [];
          var createdAt = [];
          

          for (var i = 0; i < data.feeds.length; i++) {
            temperatureData.push(data.feeds[i].field2);
            const date = new Date(data.feeds[i].created_at);
            const options = { weekday: "long" };
            const dayOfWeek = date.toLocaleDateString("en-US", options);
            createdAt.push(dayOfWeek);
          }
          // console.log(temperatureData);
          // console.log(createdAt);
          const listContainer = document.getElementById('listContainer');

          for (let i = 0; i < createdAt.length; i++) {
            const parentItem = document.createElement('ul');
                parentItem.textContent = createdAt[i];
              const childItem = document.createElement('li');
              childItem.textContent =( temperatureData[i]*1).toFixed(1);
              parentItem.appendChild(childItem);
            
          
            listContainer.appendChild(parentItem);
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error("Error:", error);
        });
        const options = { weekday: "long" };

        fetch("https://thingspeak.com/channels/2155544/field/3.json?results=10")
        .then((response) => response.json())
        .then((data) => {
          var humidity = [];
          var humiditycreatedat = [];
          for (var i = 0; i < data.feeds.length; i++) {
            humidity.push(data.feeds[i].field3);
            const date = new Date(data.feeds[i].created_at);
            const dayOfWeek = date.toLocaleDateString("en-US", options);
            humiditycreatedat.push(dayOfWeek);
           
          }

          const humiditycontainer = document.getElementById("humidity")
          for (let i = 0; i < humiditycreatedat.length; i++) {
            const parentItem = document.createElement('ul');
                parentItem.textContent = humiditycreatedat[i];
              const childItem = document.createElement('li');
              childItem.textContent = (humidity[i]*1).toFixed(1);
              parentItem.appendChild(childItem);
            
          
            humiditycontainer.appendChild(parentItem);
          }
        })

