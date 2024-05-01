# Analysis exercise 

As a backend developer you will not only code but also be able to analyze requirements and design models that fulfills requirements properly. 
The aim of this task is to evaluate your analytical and design skills. Next, you are provided with a fictitious reality description. Please read and analyze it carefully before moving on to the design task.

## Reality description: 

Asset tokenization is the process of converting rights to an asset into a digital token on a blockchain. Essentially, this means taking something valuable from the real world and creating a digital representation of it that can be managed and transacted on a digital ledger. This could apply to a variety of assets, including real estate, art, or commodities. By tokenizing assets, owners can potentially increase liquidity, as these digital tokens can be easily divided and sold in smaller units, making it simpler for investors to buy shares of the asset. Additionally, blockchain technology can provide a secure and transparent record of ownership and transactions, which can reduce the likelihood of fraud and make the process of buying, selling, and transferring assets more efficient.

As it was previously described, a broad variety of assets can be tokenized. However, for this challenge, we will narrow down the scope and consider only companies as assets to be tokenized. A tokenized company has two important properties: token symbol and token name. 

There are two main actors, the owner of the company, let's name him/her ‘tokenizer’, and the ‘investors’, who buys tokens through active offerings. Each company can have only one offering active at the same time. An offering has a start and end date, a total amount of tokens to sell, the price in USD of each token, and a min and max investment in USD, i.e., the minimum and maximum amount of USD that a single investor can invest in an offering. Thus, when investors want to get participation in a company, they invest by buying the company token. 


### Constraints: 
- Token symbol: Only letters and numbers, between 2 and 5 characters. Two companies can’t have the same token symbol
- Offerings can’t take longer than 1 year
- An investor might invest many times in a single offering but never exceed the max investment value defined at the offering creation time
- Offerings status can take the following values: Scheduled, Ongoing, Finished
- Users have the following attributes: name, email, address. Two users can’t have the same email address. 
- Each investment is associated with a specific offering.
- Each offering is associated with a single company.
- Tokenizers are not allowed to invest in any company. Investors are not allowed to create companies. This is, users must be somehow differentiated.



## Task: 

Analyze the previously described reality and design a domain model using UML or any other standardized modeling language of your choice. This model must represent the properties of each entity as well as the relationship between them. 

### Deliverable: Upload a diagram named `domain-model.png` the folder `docs/models`

