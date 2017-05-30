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

const MODULE_PATH      = '/usr/share/dtk/modules'
const PROVIDER_MODULE_PATH = '/usr/share/dtk/modules/dtk-provider-ruby'
const DEFAULT_NODEJS_VERSION = '7.10';

// process the message received from dtk-arbiter
function processMessage(call, callback) {
  var reply = new messages.ArbiterMessage();
  // console.log(call.request.getMessage());

  var provider_message_hash = JSON.parse(call.request.getMessage())
  var gem_list = provider_message_hash['provider']['npms']
  var nodejs_version = provider_message_hash['provider']['nodejs_version'] || DEFAULT_NODEJS_VERSION
  var entrypoint = provider_message_hash['provider']['entrypoint']
  var component_name = provider_message_hash['component_name']
  var module_name = provider_message_hash['module_name']
  var dtk_debug = provider_message_hash['dtk_debug']
  var dtk_debug_port = provider_message_hash['dtk_debug_port']
  var module_path_absolute = `${MODULE_PATH}/${module_name}`
  var entrypoint_absolute = `${module_path_absolute}/${entrypoint}` 
  var instance_attributes = generateAttributes(provider_message_hash)

  // require the entrypoint from the module
  dtkModule = require(entrypoint_absolute);

  var execution_response = dtkModule.execute(instance_attributes);

  reply.setMessage(call.request.getMessage());
  callback(null, reply);
}

function generateAttributes(provider_message_hash) {
	return provider_message_hash;
}

function main() {
  var server = new grpc.Server();
  server.addService(services.ArbiterProviderService, {processMessage: processMessage});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
