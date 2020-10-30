/*****
 License
 --------------
 Copyright © 2020 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License")
 and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed
 on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 - Lewis Daly <lewisd@crosslaketech.com>
 --------------
 ******/


import TestEnv from '../e2e/TestEnv'
import axios from 'axios'

const baseRequestConfig = {
  headers: {
    'Content-Type': 'application/vnd.interoperability.thirdparty+json;version=1.0',
    Accept: 'application/vnd.interoperability.thirdparty+json;version=1.0',
    'FSPIOP-Source': 'dfspA',
    'FSPIOP-Destination': 'pispA',
    Date: new Date().toUTCString()
  }
}


jest.setTimeout(10 * 1000) // 10 seconds

describe('DFSP side account linking contract tests', () => {
  it('Calls `PUT /consentRequests/{id}` with the WEB auth channel', async () => {
    // Arrange
    const consentRequestId = '4cab6274-8b3e-41b4-83ce-fc0847409155'
    const consentRequestsURI = `${TestEnv.baseUrls.mlTestingToolkit}/consentRequests/${consentRequestId}`
    const data = {
      initiatorId: 'pispA',
      authChannels: ['WEB'],
      scopes: [
        {
          accountId: 'dfspa.alice.1234',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        },
        {
          accountId: 'dfspa.alice.5678',
          actions: [
            'accounts.transfer',
            'accounts.getBalance'
          ]
        }
      ],
      callbackUri: 'pisp-app://callback.com',
      authUri: 'dfspa.com/authorize?consentRequestId=xxxxx',
    }

    const result = await axios.put(consentRequestsURI, data, baseRequestConfig)
    // Assert
    expect(result.status).toBe(202)

    // technically the callback from the PISP should just be the same resource with the `authToken` field
    // const consentRequestsCallbackURI =
    //   `${TestEnv.baseUrls.mlTestingToolkitInbound}/longpolling/callbacks/consentRequests/${consentRequestId}`
    // console.log('consentRequestsCallbackURI', consentRequestsCallbackURI)
    // const response = await axios.get(consentRequestsCallbackURI, baseRequestConfig)
    // const consentRequestsCallbackResponse = (response.data.data) ? response.data.data : response.data.body
    // const expected = {
    //   initiatorId: 'pispA',
    //   authChannels: [
    //     'WEB'
    //   ],
    //   scopes: [
    //     {
    //       accountId: 'dfspa.alice.1234',
    //       actions: [
    //         'accounts.transfer',
    //         'accounts.getBalance'
    //       ]
    //     },
    //     {
    //       accountId: 'dfspa.alice.5678',
    //       actions: [
    //         'accounts.transfer',
    //         'accounts.getBalance'
    //       ]
    //     }
    //   ],
    //   callbackUri: 'pisp-app://callback.com',
    //   authUri: 'dfspa.com/authorize?consentRequestId=xxxxx'
    // }

    // // Assert
    // expect(response.status).toBe(200)
    // expect(consentRequestsCallbackResponse).toEqual(expected)
  })

  it.todo('Calls `PUT /consentRequests/{id}` with the OTP auth channel')
  it.todo('Calls `POST /consents`')

  // Auth-Service OR DFSP
  it.todo('Calls `PUT /consents/{id}`')
})