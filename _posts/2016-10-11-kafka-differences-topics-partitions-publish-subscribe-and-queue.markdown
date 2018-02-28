---
title:  "Kafka differences: topics, partitions, publish/subscribe and queue."
date: 2017-10-11 22:27:46
permalink: kafka-differences-topics-partitions-publish-subscribe-and-queue
---

When I first started to look at Kafka as a event publishing system, my first question was 'How to create pub/sub and queue type of events?'. Unfortunately, there was no quick answers for that, because the way Kafka works. My previous article was about [Kafka basics](http://ivanursul.com/apache-kafka-basics/), which you can, of course, read and get more information about this cool [commit log](http://kafka.apache.org/documentation.html#introduction). By this article I'll try to explain why Kafka is different from other similar system, how it differs, and will try to answer to all interesting questions, which I had in the beginning.

### Why Kafka is a commit log?
Simply, because Kafka works different to other pub/sub systems. It's a commit log, where new messages are being appended constantly.

![](https://content.linkedin.com/content/dam/engineering/en-us/blog/migrated/log.png)

Each message has it's own unique id, which is called [offset](http://kafka.apache.org/documentation.html#intro_topics)

### Okay, and how to consume this so called 'commit log' ?

Consumer stores one thing - offset, and he is responsible for reading messages. Consider this console consumer

> bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic test --from-beginning

As you see, this consumer will read all log from the beginning.

### Are messages being deleted ?

Yes, after some time, there's a retention policy.

### So, how to create pub/sub model ?

Every consumer should be in a unique consumer group.

### What about queue model ?

You set all consumers in a single consumer group and message will be delivered to someone from the group.

## A strange thing, don't you think ?

Me not. The reason for that is because each partition is will be consumed per exactly one consumer in a consumer group. That's hard, yes. Partition is a unit of parallelism inside consumer group. When you have one partition and lot of consumer groups - you won't get any troubles. But when you have a single consumer group and only one partion, then ....

## Remember to make sure you have enough partitions in your topic.

> bin/zookeeper-server-start.sh config/zookeeper.properties

> bin/kafka-server-start.sh config/server.properties

> bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test

> bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic test --consumer.config config/consumer-1.properties

> bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic test --consumer.config config/consumer-2.properties

**consumer-1.properties:**
```
group.id=group-1
```

**consumer-2.properties:**
```
group.id=group-2
```

> bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test

Try to type some messages. You'll see, that messages will be consumed by both consumers.

Now, let's change something. Shutdown consumers, edit consumer properties and restart consumers.

**consumer-1.properties:**
```
group.id=group-1
```

**consumer-2.properties:**
```
group.id=group-1
```

You will get a similar message
```
[2016-07-13 22:11:40,584] WARN No broker partitions consumed by consumer thread test-consumer-group_Ivans-MacBook-Pro.local-1468437100356-aa97cd2a-0 for topic test (kafka.consumer.RangeAssignor)
```

That's mean, that you don't have enough partitions. Remember, partition is used to parallelise things inside topic.

Possible options - create topic with more partitions and restart

> bin/kafka-topics.sh --create --zookeeper localhost:2181 --partitions 2 --topic test

## What are the guarantees ?
At a high-level Kafka gives the following guarantees:

* Messages sent by a producer to a particular topic partition will be appended in the order they are sent. That is, if a message M1 is sent by the same producer as a message M2, and M1 is sent first, then M1 will have a lower offset than M2 and appear earlier in the log.
* A consumer instance sees messages in the order they are stored in the log.
* For a topic with replication factor N, we will tolerate up to N-1 server failures without losing any messages committed to the log.

Source: Apache Kafka [documentation](http://kafka.apache.org/documentation.html#intro_guarantees)

## How not to loose messages ?

Read about replication factor. In a nutshell, you need to deploy multiple Kafka brokers and distribute replicas across multiple brokers. In a single partition, there's always a leader, and a follower. Leader partition is responsible for all read/write requests within some broker. If a leader will fail - then there'll be an election and a new leader will be elected.

## Can a broker hold multiple leaders ?

Sure, for example, if you have a single broker.

Looks like, that's it, I',m finished, but I'd be glad to get more suggested questions from you. Feel free to post them in your messages and let's answer them together.
