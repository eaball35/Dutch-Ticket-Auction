package com.TicketTime.TicketTime.controller;

import com.TicketTime.TicketTime.exception.NotFoundException;
import com.TicketTime.TicketTime.model.Order;
import com.TicketTime.TicketTime.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://ticketclock.com")
@RestController
@RequestMapping("/orders")
public class OrderController {

    private OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/all")
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    @PutMapping
    public String insert(@RequestBody Order order) {
        Order newOrder = this.orderRepository.insert(order);
        return newOrder.getId();
    }

    @PostMapping
    public Order update(@RequestBody Order order) {
        Order newOrder = this.orderRepository.save(order);
        return newOrder;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        getById(id);
        this.orderRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Order> getById(@PathVariable("id") String id) {
        Optional<Order> order = this.orderRepository.findById(id);
        if (order.equals(null)) {
            throw new NotFoundException("Order Not Found");
        }
        return order;
    }

//    Get all orders by user
    @GetMapping("/user/{id}")
    public List<Order> getOrdersByUser(@PathVariable("id") String id) {
        return this.orderRepository.findByUser(id);
    }

//    Get order by ticket
    @GetMapping("/ticket/{id}")
    public Order getOrderByTicketListing(@PathVariable("id") String id) {
        return this.orderRepository.findByTicketListing(id);
    }
}
