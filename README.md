
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a >
    <img src="/demo.gif">
  </a>

  <h1 align="center">Anigram</h1>

  <p align="center">
    A vanilla JavaScript project that utilized a Rails backend to generate random instagram like social media posts. Users can leave a comment on each character, refresh to return to the first character "Cyrano", and listen to a song from the ANCH API. 
    <br />
    <a href="https://vakas-786.github.io/mod-3-anigram/index.html">View Demo</a>
    .
    <a href="https://github.com/vakas-786/mod-3-project-BACKEND"> Backend Repo</a>
  </p>
</p>




### Built With

* JavaScript
* Ruby on Rails
* <a href="http://acnhapi.com/">ACNH API</a>
* HTML5
* CSS3

# Technical Challenges
The information for the project was provided by the /villages endpoint from the ACNH API. Here is an example of the data the endpoint provided:
```sh
{
id: 1,
file-name: "ant00",
name: {
name-USen: "Cyrano",
name-EUen: "Cyrano",
name-EUde: "Theo",
name-EUes: "Cirano",
name-USes: "Cirano",
name-EUfr: "Cyrano",
name-USfr: "Cyrano",
name-EUit: "Cirano",
name-EUnl: "Cyrano",
name-CNzh: "阳明",
name-TWzh: "陽明",
name-JPja: "さくらじま",
name-KRko: "사지마",
name-EUru: "Сирано"
},
personality: "Cranky",
birthday-string: "March 9th",
birthday: "9/3",
species: "Anteater",
gender: "Male",
subtype: "B",
hobby: "Education",
catch-phrase: "ah-CHOO",
icon_uri: "https://acnhapi.com/v1/icons/villagers/1",
image_uri: "https://acnhapi.com/v1/images/villagers/1",
bubble-color: "#194c89",
text-color: "#fffad4",
saying: "Don't punch your nose to spite your face.",
catch-translations: {
catch-USen: "ah-CHOO",
catch-EUen: "ah-CHOO",
catch-EUde: "schneuf",
catch-EUes: "achús",
catch-USes: "achús",
catch-EUfr: "ATCHOUM",
catch-USfr: "ATCHOUM",
catch-EUit: "ett-CCIÙ",
catch-EUnl: "ha-TSJOE",
catch-CNzh: "有的",
catch-TWzh: "有的",
catch-JPja: "でごわす",
catch-KRko: "임돠",
catch-EUru: "апчхи"
}
},
```
In order to retrieve the required nested data (we only wanted the english names, names were provided in other languages) and seed it into our database we implemented the following code: 

```sh
require 'net/http'
ANIMAL_URL = 'https://acnhapi.com/v1a/villagers/'

def get_animals(animal_url)
    uri = URI.parse(animal_url)
    response = Net::HTTP.get_response(uri)
    animal_obj = JSON.parse(response.body)
 
    animal_obj.each do |characters|
        name = characters["name"]["name-USen"]
        Animal.create(name: name, image_url: characters["image_uri"], personality: characters["personality"], quote: characters["saying"], icon_url: characters["icon_uri"], species: characters["species"])
    end 
end 

get_animals(ANIMAL_URL) 
```



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

1. Clone the backend repo
```sh
git clone https://github.com/vakas-786/mod-3-project-BACKEND.git
```
2. Install required gems
```sh
bundle install
```
3. Create a local database
```sh
rails db:create
```
4. Migrate 
```sh
rails db:migrate
```
5. Seed the data 
```sh
rails db:seed
```
6. Start the server
```sh
rails s
```

### Installation

1. Clone the repo
```sh
https://github.com/vakas-786/mod-3-anigram.git
```
2. Open the app
```sh
open index.html
```



## Authors

* <a href='https://github.com/vakas-786/'> @vakas-786 </a>
* <a href='https://github.com/jzhouerm/'> @jzhouerm </a>






