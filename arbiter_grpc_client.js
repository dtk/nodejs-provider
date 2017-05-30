#!/usr/bin/env nodejs

/*
 *
 * Copyright 2015, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

var messages = require('./lib/dtkarbiterservice_pb');
var services = require('./lib/dtkarbiterservice_grpc_pb');

var grpc = require('grpc');

function main() {
  var client = new services.ArbiterProviderClient('localhost:50051',
                                          grpc.credentials.createInsecure());
  var request = new messages.ProviderMessage();
  var message = "{\"provider\":{\"entrypoint\":\"bin.js\"},\"instance\":{\"dtk_service_instance\":\"datadog-datadog-example\",\"datadog_api_key\":\"test\",\"datadog_app_key\":\"test\",\"kms_encryption_key_alias\":\"test\",\"region\":\"us-east-1\",\"aws_access_key_id\":null,\"aws_secret_access_key\":null},\"component_name\":\"dtk-examples:datadog\",\"module_name\":\"nodejs-test\",\"breakpoint\":true}"
  //var message = JSON.parse(message_string)

  request.setMessage(message);
  client.processMessage(request, function(err, response) {
    console.log('Response:', response.getMessage());
  });
}

main();
