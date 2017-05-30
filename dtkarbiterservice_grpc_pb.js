// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015, Google Inc.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
'use strict';
var grpc = require('grpc');
var dtkarbiterservice_pb = require('./dtkarbiterservice_pb.js');

function serialize_dtkarbiterservice_ArbiterMessage(arg) {
  if (!(arg instanceof dtkarbiterservice_pb.ArbiterMessage)) {
    throw new Error('Expected argument of type dtkarbiterservice.ArbiterMessage');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_dtkarbiterservice_ArbiterMessage(buffer_arg) {
  return dtkarbiterservice_pb.ArbiterMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dtkarbiterservice_ProviderMessage(arg) {
  if (!(arg instanceof dtkarbiterservice_pb.ProviderMessage)) {
    throw new Error('Expected argument of type dtkarbiterservice.ProviderMessage');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_dtkarbiterservice_ProviderMessage(buffer_arg) {
  return dtkarbiterservice_pb.ProviderMessage.deserializeBinary(new Uint8Array(buffer_arg));
}


// The Arbiter Provider service definition.
var ArbiterProviderService = exports.ArbiterProviderService = {
  // Execute the provider
  processMessage: {
    path: '/dtkarbiterservice.ArbiterProvider/Process',
    requestStream: false,
    responseStream: false,
    requestType: dtkarbiterservice_pb.ProviderMessage,
    responseType: dtkarbiterservice_pb.ArbiterMessage,
    requestSerialize: serialize_dtkarbiterservice_ProviderMessage,
    requestDeserialize: deserialize_dtkarbiterservice_ProviderMessage,
    responseSerialize: serialize_dtkarbiterservice_ArbiterMessage,
    responseDeserialize: deserialize_dtkarbiterservice_ArbiterMessage,
  },
};

exports.ArbiterProviderClient = grpc.makeGenericClientConstructor(ArbiterProviderService);
