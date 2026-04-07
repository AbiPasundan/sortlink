package service

import (
	"linksort/internal/models"
	"linksort/internal/repository"
)

type LinksService struct {
	LinkRepo *repository.LinksRepository
}

func NewLinksService(repo *repository.LinksRepository) *LinksService {
	return &LinksService{
		LinkRepo: repo,
	}
}

func (s *LinksService) CreateLinkService(link models.CreateLinks) error {
	return s.LinkRepo.CreateLink(link)
}

func (s *LinksService) GetLinkService(id int) ([]models.GetLinks, error) {
	return s.LinkRepo.GetLinks(id)
}

func (s *LinksService) DeleteLinkService(userId int, id int) error {
	return s.LinkRepo.DeleteLink(userId, id)
}
