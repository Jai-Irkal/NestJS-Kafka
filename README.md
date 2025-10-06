# NestJS-Kafka
# Commands to Run
Enter Below command to pull the zookeeper and kafka broker container
$docker compose up

Enter below Kafka CLI commands:
$docker ps :to check if containers are running
$docker exec -t [containerName]-kafka-1 bash :to go to the termianl in the Kafka container
$kafka-topics.sh --bootstrap-server localhost:9092 --list :lists all the topics
$kafka-topics.sh --bootstrap-server localhost:9092 --create --topic order_created --partitions 1 --replication-factor 1 :create a topic
$kafka-console-producer.sh --broker-list localhost:9092 --topic order_created :command to send messages to the topic

Enter into consumer CLI
$docker exec -it [containerName]-kafka-1 bash
$kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic order_created --from-beginning