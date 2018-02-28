---
title:  "Do we really know our application performance behaviour ?"
date: 2017-10-11 11:20:00
permalink: performance-testing-explained
---


Why do performance testing ? Are you asking this question ? You maybe asking "are we ready to go live?". You have enough functional tests, they are working well, your business logic is well tested, and you are sure you won't have any troubles on your production servers. On the other side, you have lot's of infrastructure work, which is not covered by your tests. Let's say, you have few applications, couple of databases, cached layer, and of course, load balancer layer. 

What about failover, are our load balancer working correctly ? Oh, by the way, what if we run our load test for a long period of time, what will happen ? Will you notice some performance degradation after ? 

Another thing, your application was successful enough to double its transactions, will it's performance behave the same after ? 

Performance testing can answer this questions, and if you don't know the answers for them before running on production, then, eventually, your customers will answer them. Testing is all about risk - you have a choice - do it, or skip. And if you are lucky enough to properly write your application without writing a single test - then you can save a lot of money. In practice, you're a human, which more or less, has some issues besides your work, and, honestly, you can't write a software without mistakes. That's why I advocate for writing performance tests, and analysing them in the future.

### What is performance testing ?

There're a lot of synonyms: load testing, stress testing, performance testing, capacity testing, volume testing, non-functional testing. The goal is to evaluate end user experience in realistic scenarios. It can allow you to find out some interesting facts - let's say, you can find, that your application server can't handle more that 10k requests per second, and you need to do something with it. Performance testing is based on real business requirements, which mean, that sending 10k concurrent requests to a single home page isn't a true performance test, because your application more likely behaves not like that. 

### Criteria of a good performance test

My understanding is that you should always have a concurrent users, which run different relevant scenarios. Each independent user should have natural speed, and should execute requests as in the real world. As a result, you will receive unit of answer - response time, which will be analysed later, and this analysis should answer most of the questions about your future production infrastructure. Normally, per given unit of time, you should know what load did you made, and what average response time did you get.

### Preface

I'm going to share some examples of performance testing, and essentially, I need to share some examples. I'm going to use [gatling stress tool](http://gatling.io/) for this. It's written in scala, and has wonderful DSL for writing tests. Gatling has good [documentation](http://gatling.io/docs/2.2.2/), so feel free to read it in your free time.

### Type of tests


![](assets/images/performance00123844D5EB--1-.png)

### Stress test

The idea is to find the limits of your system. You'll find your maximum design capacity, which is one of the answers. According to your **mdc** your application can be planned accordingly, and without troubles. If often comes, that your maximum design capacity is not enough, so you need to tune your application, maybe find some bottlenecks, fix them, and run your stress test once again. 

### Peak Load Test

A peak load test is something you use to simulate some peak load over some period of time, which often happen in your application. Let's say, you have more visits over a weekends. The key goal is to make sure, that your application has no degradation during peak test. Remember, peak load is not the average load, it's something called **maximum** or **peak** **load** You should find out it during performance planning phase, and build your tests accordingly to make sure there is no degradation.

### Soak Test

Soak testing is something you run for a long period of time to make sure you have no memory leaks in your application. This happen if you write your application with an statefull style, and some objects in your application start to grow over some period of time.

Let's say, you have some endpoint, which you want to test. If you will test your application with an average load for a longer period of time, you should notice memory leak and appropriate problems in your application.

```
Controller {

    list requests

    @'/endpoint'
    endpoint(HttpRequest request) {
         // storing request in memory
         // Don't ask why
         requests.add(request);
         var something = ...
         return something;
    } 

}
```

In example above, your app won't be able to store enough requests after some time, and will fail with outofmemory exception.

**Practical example**: We have three endpoints, and I'll continuosly send requests to them over 24 hours. If you have memory leaks, this test should show the problems.

{% gist 712d8af0e7dc5e3c25ec7b96195d6c01 %}

Pay attention to simulation setup section:

> constantUsersPerSec(5) during(24 hours)

We have the same load over all period of time, so we don't expect any spikes, and so on, we only concentrate on getting long running problems.

### Spike Test

The only purpose of spike test is to find out if your system can survive, if your test load will be greater, than maximum design capacity. The most positive result of spike test is that your service average response time will be big and not acceptable for end users. The worst option - your service will fall down, which mean you need to do something with it.

### Rethink

The importance of writing tests had been proofed by many project failures. It's a common knowledge, that writing tests is an essential part of successful project. One good think about tests is that you will no longer need to check everything manually, because you'll have a regression history and will fully rely on previous test result. Performance test regression is a good thing to have in your project, believe me.

### Links


* [Performance Basics: Peak Load Testing — Don’t Suck like Bank of America](https://www.joecolantonio.com/2011/10/15/performance-basics-peak-load-testing-don%E2%80%99t-suck-like-bank-of-america/)

* [What is soak testing ?](http://www.tutorialspoint.com/software_testing_dictionary/soak_testing.htm)