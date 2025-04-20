// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface ITradeToken {
    function mint(address to, uint amt) external;
    function balanceOf(address a) external view returns (uint);
    function burn(address from, uint amt) external;
}

contract TP {
    address public exp;
    address public imp;
    ITradeToken public t;
    uint public tp;
    uint public tpg;
    uint8 public pt;
    uint public ca;
    uint public lt;
    bytes32 private d;
    bool public i;
    uint8 public s;

    modifier onlyE() {
        require(msg.sender == exp, "e");
        _;
    }

    modifier onlyI() {
        require(msg.sender == imp, "i");
        _;
    }

    constructor(address tk) {
        t = ITradeToken(tk);
    }

    function init(address _e, address _i, uint _tp, uint8 _pt) external {
        require(!i, "i");
        i = true;
        exp = _e;
        imp = _i;
        tp = _tp;
        pt = _pt;
        s = 0;
    }

    function getD() external view returns (bytes32) {
        require(ca > 0, "no collat");
        return d;
    }

    function pc() external payable onlyI {
        require(msg.value == (tp * 60) / 100, "60");
        require(ca == 0, "1x");
        ca = msg.value;
    }

    function am() external onlyI {
        require(ca > 0, "0");
        t.mint(exp, (tp * 975) / 1000);
    }

    function sd(bytes32 h) external onlyE {
        require(s == 0, "s");
        d = h;
        s = 1;
    }

    function p() external payable onlyI {
        require(s == 1 || s == 2, "s");
        uint m = (tp - ca) / pt;
        require(msg.value == m, "amt");
        tpg += msg.value;
        lt = block.timestamp;
        if (tpg + ca >= tp) s = 3;
    }

    function w() external onlyE {
        require(s == 3, "d");
        uint b = t.balanceOf(msg.sender);
        require(b > 0, "0");
        uint x = (b * 20) / 1000;
        uint a = b + x;
        t.burn(msg.sender, b);
        (bool sent, ) = payable(msg.sender).call{value: a}("");
        require(sent, "x");
    }

    function ci() external onlyI {
        uint a = (tp * 5) / 1000;
        (bool sent, ) = payable(imp).call{value: a}("");
        require(sent, "x");
    }
}
