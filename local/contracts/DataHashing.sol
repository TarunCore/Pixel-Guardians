// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataHashing {
    uint8 a=2;
    struct Data {
        string author;
        string id;
        string date;
        string model;
    }

    mapping(bytes32 => Data) public hashedData;
    function gett() public view returns (uint8){
        return a; 
    }
    function hashAndStoreData(string memory _author, string memory _id, string memory _date, string memory _model) public returns (bytes32) {
        bytes32 hash = keccak256(abi.encodePacked(_author, _id, _date, _model));
        hashedData[hash] = Data(_author, _id, _date, _model);
        return hash;
    }

    function dehashData(bytes32 _hash) public view returns (string memory author, string memory id, string memory date, string memory model) {
        Data memory data = hashedData[_hash];
        return (data.author, data.id, data.date, data.model);
    }
}