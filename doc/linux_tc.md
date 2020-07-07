# Traffic shaping by tc and cgroup(Docker)  -- Part 1

author: Yunzhi Lin

> TC (traffic shaping) is a very effective tool for shaping traffic.

## Four main ways to control traffic

### SHAPING

Shaping is often aimed at outbound traffic, because the system can queue and layer traffic in the cache queue area before outbound, and for inbound traffic, because the sender buffer cannot be controlled, packet loss can only be handled through traffic policing. (There is a way to handle inbound traffic shaping using IFB)

### scheduling

Prioritize outbound packets

### policing

Processing inbound traffic

### dropping

Discard inbound and outbound packets


## tc flow control is handled by three objects

### qdisc(queueing discipline)

qdisc is divided into two categories

#### claseless qdisc

claseledd qdisc is a kind of qdisc without class.Although for some qdisc, it has a certain classification of packets (for example: pfifo_fast), but its classification function is very fixed, and it cannot configure an advanced hierarchy.

_Some commonly used claseless qdisc_

1. pfifo
2. pfifo_fast
3. red(Random Early Detection)
4. sqf(Stochastic Fairness Queueing)
5. tbf(Token Bucket Filter)

In claseless qdisc, tbf is mainly used for traffic speed limit. In tbf, it has a token mechanism. Initially, the token fills the entire bucket to deal with the outbreak of traffic, and when the traffic is queued The cards are issued in the bucket at a certain rate and combined with the traffic packets that enter the team. Only the traffic packets that have tokens can be dequeued.
